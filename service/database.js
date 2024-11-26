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
const db = client.db("rpsshowdown");
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

async function getUser(username) {
  const user = await userCollection.findOne({ username: username });
  if (!user) {
    return null;
  }
  const token = uuid.v4();
  return await userCollection.findOneAndUpdate(
    { username: username },
    { $set: { token: token } },
    { returnDocument: "after" } // Ensures the updated document is returned
  );
}

async function getUserByToken(token) {
  return await userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  try {
    const result = await userCollection.insertOne(user);
    console.log("Insert Result:", result);
  } catch (err) {
    console.error("Insert Error:", err);
  }
  return user.token;
}

async function addScore(score, token, username) {
  const currentScore = await scoreCollection.findOne({ token: token });
  if (currentScore) {
    let newScore = score.score + currentScore.score;
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
  let highScores = await scoreCollection
    .find({})
    .sort({ score: -1 }) // Sort by `score` in descending order
    .limit(50) // Limit to top 50 results
    .toArray(); // Convert to array
  return highScores;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
};
