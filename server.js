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
  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => {
      res.status(400).json("unable to register");
    });
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.user.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("user not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  database.user.forEach(user => {
    if (user.id === id) {
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!id) {
    res.status(400).json("user not found");
  }
});

app.listen(3000);
