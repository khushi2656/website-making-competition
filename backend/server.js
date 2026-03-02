const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redisClient');
const studentRoutes = require('./routes/studentRoutes');

// Load env vars
dotenv.config();

const app = express();

// CORS - allow frontend origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://website-making-competition-frontend.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize DB + Redis before every request (serverless-safe, reuses open connections)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    await connectRedis();
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// API Routes - must be defined BEFORE static/catch-all
app.use('/api/students', studentRoutes);

// Serve React frontend build (static files)
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all: send index.html for any non-API route (React SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Local development only - Vercel handles listening in production
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for Vercel serverless
module.exports = app;
