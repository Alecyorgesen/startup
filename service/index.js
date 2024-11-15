const express = require("express");
const uuid = require("uuid");
const app = express();

let users = {};
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static("public"));

var apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.post("/auth/create", async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(send({ msg: "User already exists" }));
  } else {
    const user = {
      email: req.body.email,
      password: req.body.password,
      token: uuid.v4(),
    };
    users[user.email] = user;

    res.send({ token: user.token });
  }
});

apiRouter.post("/api/login", async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

apiRouter.delete('/api/logout', async (req, res) => {
    
})