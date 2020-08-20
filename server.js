const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const handleSignIn = require('./controllers/signIn')
const handleRegistration = require('./controllers/register')
const handleProfileId = require('./controllers/profile')
const { handleEntries, handleApiCall } = require('./controllers/image')

const db = knex({
  client: "pg",
  connection: {
    connectString: process.env.DATABASE_URL,
    ssl: true
  },
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('running')
})

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

app.post("/imageurl", (req, res) => {
  handleApiCall(req, res)
});

app.listen(process.env.PORT || 3000);
