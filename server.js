const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");

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

const database = {
  user: [
    {
      id: "123",
      name: "Chris Cooney",
      email: "testing@test.co.uk",
      password: "Password",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Laura Cooney",
      email: "testing_Laura@test.co.uk",
      password: "Password",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.json(database.user);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.user[0].email &&
    req.body.password === database.user[0].password
  ) {
    res.json(database.user[0]);
  } else {
    res.status(400).json("Sorry, wrong password/email");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email,
    })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => {
    res.status(400).json("unable to register");
  });
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
