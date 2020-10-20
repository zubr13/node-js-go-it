const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

console.log('passwod', process.env.DB_PASSWORD);
console.log('db name', process.env.DB_NAME);

const MONGO_URL = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.qsl0a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

start();

async function start () {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db();

    const usersCollection = db.collection('users');

    const users = await usersCollection.find().toArray();

}