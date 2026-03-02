const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redisClient');
const studentRoutes = require('./routes/studentRoutes');

// Load env vars
dotenv.config();

const app = express();

// CORS - allow frontend origins
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL // set this in Vercel env vars as your frontend URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
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

// Routes
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
