// searchRoutes.js
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Route serving /api/search with category filtering
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        let query = {};

        // Task 6 requirement: filter items by category
        if (req.query.category && req.query.category !== "all") {
            query.category = req.query.category;
        }
        if (req.query.condition) {
            query.condition = req.query.condition;
        }
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: "i" };
        }

        const gifts = await collection.find(query).toArray();
        res.json(gifts);
    } catch (e) {
        res.status(500).send("Error searching gifts: " + e.message);
    }
});

module.exports = router;
