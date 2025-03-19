const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('./db');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO Users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(400).send({ message: 'Invalid username or password' });
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid username or password' });
        }
        req.session.user = { id: user.id, username: user.username, role: user.role };
        res.send({ message: 'Login successful' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Logout a user
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send({ message: 'Logout successful' });
});

// Add this endpoint to the existing auth.js file
router.get('/check', (req, res) => {
    if (req.session.user) {
        res.send({ isAuthenticated: true, user: req.session.user });
    } else {
        res.send({ isAuthenticated: false });
    }
});

module.exports = router;