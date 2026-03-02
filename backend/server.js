const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redisClient');
const studentRoutes = require('./routes/studentRoutes');

// Load env vars
dotenv.config();

const app = express();

// CORS - allow all origins (open for competition/demo deployment)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
// Explicitly handle OPTIONS preflight for all routes
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize DB + Redis before every request (serverless-safe, reuses open connections)
// Skip for OPTIONS preflight requests so CORS works correctly
app.use(async (req, res, next) => {
  if (req.method === 'OPTIONS') return next();
  try {
    await connectDB();
    await connectRedis();
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// API Routes
app.use('/api/students', studentRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Student Database Management System API' });
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
