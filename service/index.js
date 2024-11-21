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
  const user = users[req.body.name];
  if (user) {
    res.status(409).send({ msg: "User already exists" });
  } else {
    const user = {
      name: req.body.name,
      password: req.body.password,
      token: uuid.v4(),
    };
    users[user.name] = user;

    res.send({ token: user.token });
  }
});

apiRouter.post("/auth/login", async (req, res) => {
  const user = users[req.body.name];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      users[user.name] = user;

      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
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
  if (!req.body || !req.body.token || typeof req.body.score !== "number") {
    console.log("Invalid request: No token or score was sent!!!");
    return res.status(400).send("Invalid request");
  }

  const user = Object.values(users).find(
    (user) => user.token === req.body.token
  );
  if (!user) {
    return res.status(404).send("User not found");
  }
  const prevScore = scores.find((score) => score.name === user.name);
  if (prevScore) {
    if (req.body.score > prevScore.score) {
      i = 0;
      for (score of scores) {
        if (score.name === prevScore.name) {
          break;
        }
        i += 1;
      }
      scores[i] = score;
    }
  }

  scores.sort((item1, item2) => item2.score - item1.score);

  res.send(scores.slice(0, 20));
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
