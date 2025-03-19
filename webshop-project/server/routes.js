const express = require('express');
const router = express.Router();
const { pool } = require('./db');

// Middleware to check if user is authenticated and is an admin
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        res.status(403).send({ message: 'Forbidden' });
    }
}

// Get all products
router.get('/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Products');
        res.json(rows);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Add a new product (admin only)
router.post('/products', isAdmin, async (req, res) => {
    try {
        const { name, price, imageUrl } = req.body;
        await pool.query('INSERT INTO Products (name, price, imageUrl) VALUES (?, ?, ?)', [name, price, imageUrl]);
        res.status(201).send({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Delete a product (admin only)
router.delete('/products/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM Products WHERE id = ?', [id]);
        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Search products
router.get('/products/search', async (req, res) => {
    try {
        const { query } = req.query;
        const [rows] = await pool.query('SELECT * FROM Products WHERE name LIKE ?', [`%${query}%`]);
        res.json(rows);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;