const express = require("express");
const app = express();

const database = {
  user: [
    {
      id: 123,
      name: "Chris Cooney",
      email: "testing@test.co.uk",
      password: "Password",
      entries: 0,
      joined: new Date(),
    },
    {
      id: 124,
      name: "Laura Cooney",
      email: "testing_Laura@test.co.uk",
      password: "Password",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send("Testing");
});

app.post("/signin", (req, res) => {
  res.json("Signing in");
});

app.listen(3000);

/*
/ --> possible redirect 
/signin --> POST = success/reject
/register --> POST = user object
/profile/:id --> GET = user object
/image --> PUT = user object
*/
