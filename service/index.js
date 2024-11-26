const express = require("express");
const uuid = require("uuid");
const database = require("./database.js");
const bcrypt = require("bcrypt");
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static("public"));

const apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.post("/auth/create", async (req, res) => {
  const user = await database.getUser(req.body.username);
  if (user) {
    res.status(409).send({ msg: "User already exists" });
  } else {
    const token = await database.createUser(req.body.username, req.body.password);

    res.send({ token: token });
  }
});

apiRouter.post("/auth/login", async (req, res) => {
  const user = await database.getUser(req.body.username);
  if (user) {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    if (bcrypt.compare(passwordHash, user.password)) {
      const userInfo = await database.getUser(req.body.username);
      const token = userInfo.token;
      res.send({ token: token });
      console.log(`${userInfo.username} logged in`);
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

apiRouter.delete("/auth/logout", async (req, res) => {
  console.log("User logged out");
  res.status(204).end();
});

apiRouter.get("/scores", async (req, res) => {
  const scores = await database.getHighScores();
  res.send(scores);
});

apiRouter.post("/score", async (req, res) => {
  if (!req.body || !req.body.token || typeof req.body.score !== "number") {
    console.log("Invalid request: No token or score was sent!!!");
    return res.status(400).send("Invalid request");
  }

  const user = await database.getUserByToken(req.body.token);
  if (!user) {
    return res.status(404).send("User not found");
  } else {

    await database.addScore(req.body.score, user.username);
  }
  const scores = await database.getHighScores();
  res.send(scores);
});

apiRouter.get("/hey", async (_req, res) => {
  res.send({ message: "Hey There!!!!!!!!" });
});

app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
