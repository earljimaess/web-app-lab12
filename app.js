const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store for testing
const items = [{ id: 1, name: 'Production Server' }];

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.get('/api/items', (req, res) => {
    res.status(200).json({ success: true, data: items });
});

app.post('/api/items', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, error: 'Item name is required' });
    }
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json({ success: true, data: newItem });
});

module.exports = app;
