// db.js - MongoDB Connection
require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = "giftlinkdb";
let dbInstance = null;

async function connectToDatabase() {
    if (dbInstance) return dbInstance;
    
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    dbInstance = client.db(dbName);
    return dbInstance;
}

module.exports = connectToDatabase;
