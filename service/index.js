const express = require("express");
const uuid = require("uuid");
const database = require("./database.js");
const bcrypt = require("bcrypt");
const app = express();

const { WebSocketServer } = require("ws");

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static("public"));

// Create a websocket object
const wss = new WebSocketServer({ noServer: true });

// Handle the protocol upgrade from HTTP to WebSocket
app.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit("connection", ws, request);
  });
});

// Keep track of all the connections so we can forward messages
let connections = [];

wss.on("connection", (ws) => {
  const connection = { id: connections.length + 1, alive: true, ws: ws };
  connections.push(connection);

  // Forward messages to everyone except the sender
  ws.on("message", function message(data) {
    connections.forEach((c) => {
      if (c.id !== connection.id) {
        c.ws.send(data);
      }
    });
  });

  // Remove the closed connection so we don't try to forward anymore
  ws.on("close", () => {
    connections.findIndex((o, i) => {
      if (o.id === connection.id) {
        connections.splice(i, 1);
        return true;
      }
    });
  });

  // Respond to pong messages by marking the connection alive
  ws.on("pong", () => {
    connection.alive = true;
  });
});

setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);

const apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.post("/auth/create", async (req, res) => {
  const user = await database.getUser(req.body.username);
  if (user) {
    res.status(409).send({ msg: "User already exists" });
  } else {
    const token = await database.createUser(
      req.body.username,
      req.body.password
    );

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
