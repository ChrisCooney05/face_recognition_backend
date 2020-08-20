const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const handleSignIn = require('./controllers/signIn')
const handleRegistration = require('./controllers/register')
const handleProfileId = require('./controllers/profile')
const handleEntries = require('./controllers/image')

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
  handleProfileId(req, res, db)
});

app.put("/image", (req, res) => {
  handleEntries(req, res, db)
});

app.listen(3000);
