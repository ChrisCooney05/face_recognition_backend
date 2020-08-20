const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const handleSignIn = require('./controllers/signIn')
const handleRegistration = require('./controllers/register')

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "chriscooney",
    password: "",
    database: "face_reco",
  },
});

app.use(express.json());
app.use(cors());


app.post("/signin", (req, res) => {
  handleSignIn(req, res, bcrypt, db)
});

app.post("/register", (req, res) => {
  handleRegistration(req, res, bcrypt, db)
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({
      id: id,
    })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("user not found");
      }
    });
});

app.put("/image", (req, res) => {
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
});

app.listen(3000);
