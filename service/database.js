const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, {
  tls: true,
  serverSelectionTimeoutMS: 3000,
  autoSelectFamily: false,
});
const db = client.db("simon");
const userCollection = db.collection("user");
const scoreCollection = db.collection("score");

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(
    `Unable to connect to database with ${url} because ${ex.message}`
  );
  process.exit(1);
});

function getUser(username) {
  const user = userCollection.findOne({ username: username });
  const token = uuid.v4();
  userCollection.findOneAndReplace(
    { username: username },
    { username: user.username, password: user.password, token: token }
  );
  return user;
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user.token;
}

function addScore(score) {
  const currentScore = userCollection.findOne({ token: score.token });
  if (currentScore) {
    scoreCollection.findOneAndUpdate(
      { username: username },
      { $inc: { score: newScore } }
    );
  } else {
    // if the current user doesn't have a score yet:
    scoreCollection.insertOne({ score: score, username: username });
  }
}

async function getHighScores() {
  let highScores = await scoreCollection.find({});
  highScores.sort((score1, score2) => {
    return score2 - score1; // If it returns a positive number, it swaps the elements. So, if the second number is bigger, than swap.
  });
  return highScores.slice(0, 50);
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
};
