const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Testing");
});

app.listen(3000);

/*
/signin --> POST = success/reject
/register --> POST = user object
/profile/:id --> GET = user object
/image --> PUT = user object
*/
