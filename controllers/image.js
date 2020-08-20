const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "2bbaa1cdf7314962be09b4e47a0e3dfb",
});

function handleApiCall(req, res) {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json('error processing image')
    })
}

function handleEntries(req, res, db) {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => {
      res.status(400).json("Unable to get entries");
    });
}

module.exports = { handleEntries, handleApiCall };
