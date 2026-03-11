const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mock database path
const dbPath = path.join(__dirname, 'src', 'data', 'mockDB.json');

// Helper to read DB
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// API Routes
app.get('/api/products', (req, res) => {
    const db = readDB();
    res.json(db.products);
});

app.get('/api/products/:id', (req, res) => {
    const db = readDB();
    const product = db.products.find(p => p.id === parseInt(req.params.id));
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
});

// Mock AI Recommendations
app.get('/api/recommendations', (req, res) => {
    const db = readDB();
    // Simulate AI randomly selecting 3 items to feature
    const shuffled = db.products.sort(() => 0.5 - Math.random());
    res.json(shuffled.slice(0, 3));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Serving API and static files from public/`);
});
