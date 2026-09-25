// authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection("users");
        const { email, firstName, lastName, password } = req.body;

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const newUser = { email, firstName, lastName, password, createdAt: new Date() };
        await usersCollection.insertOne(newUser);

        const authtoken = jwt.sign({ user: { email, firstName } }, JWT_SECRET);
        res.status(201).json({ authtoken, email });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection("users");
        const { email, password } = req.body;

        const user = await usersCollection.findOne({ email, password });
        if (!user) return res.status(400).json({ error: "Invalid Credentials" });

        const authtoken = jwt.sign({ user: { email, firstName: user.firstName } }, JWT_SECRET);
        res.json({ authtoken, userName: user.firstName, userEmail: user.email });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.put('/update', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection("users");
        const { email, firstName, lastName } = req.body;

        await usersCollection.updateOne({ email }, { $set: { firstName, lastName } });
        res.json({ message: "User information updated successfully" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
