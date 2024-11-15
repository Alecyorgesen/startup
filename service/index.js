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

apiRouter.post("/auth/login", async (req, res) => {
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

apiRouter.delete("/auth/logout", async (req, res) => {
  const user = Object.values(users).find(
    (user) => user.token === req.body.token
  );
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

apiRouter.get("/scores", async (req, res) => {
  res.send(scores);
});

apiRouter.post("/score", async (req, res) => {
  const score = req.body.score;
  const user = Object.values(users).find(
    (user) => user.token === req.body.token
  );
  const prevScore = scores.find((score) => score.email === user.email);
  if (score.score > prevScore.score) {
    i = 0;
    for (score of scores) {
      if (score.email === prevScore.email) {
        break;
      }
      i += 1;
    }
    scores[i] = score;
  }
  scores.sort((item1, item2) => (item1 > item2 ? item1 : item2));
  if (scores.length >= 20) {
    res.send(scores.slice(0, 20));
    return;
  }
  res.send(scores);
});

apiRouter.get("/hey", async (req, res) => {
  res.send({ message: "Hey There!!!!!!!!" });
});

app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
