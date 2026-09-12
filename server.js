require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database (with automatic fallback)
connectDB();

// API Routes
app.use('/api', authRoutes);
app.use('/api', quizRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Root route handler
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`\x1b[32m====================================================\x1b[0m`);
    console.log(`\x1b[1m\x1b[34m 🚀 QUIZ PLATFORM MERN SERVER RUNNING \x1b[0m`);
    console.log(` Local URL:      \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
    console.log(` Dashboard:      \x1b[36mhttp://localhost:${PORT}/dashboard.html\x1b[0m`);
    console.log(` Leaderboard:    \x1b[36mhttp://localhost:${PORT}/leaderboard.html\x1b[0m`);
    console.log(`\x1b[32m====================================================\x1b[0m`);
});

module.exports = app;

