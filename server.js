const express = require("express");
const app = express();

app.use(express.json());

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
  res.json(database);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.user[0].email &&
    req.body.password === database.user[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("Sorry, wrong password/email");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.user.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.user[database.user.length - 1]);
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

app.listen(3000);

/*
/ --> possible redirect 
/signin --> POST = success/reject
/register --> POST = user object
/profile/:id --> GET = user object
/image --> PUT = user object
*/
