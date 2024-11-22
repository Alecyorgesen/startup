const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require('uuid');
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
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
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password:
  }
}
