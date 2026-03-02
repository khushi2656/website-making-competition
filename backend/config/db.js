const mongoose = require('mongoose');

const connectDB = async () => {
  // Reuse existing connection (critical for serverless cold starts)
  if (mongoose.connection.readyState >= 1) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error; // Let caller handle it (no process.exit in serverless)
  }
};

module.exports = connectDB;
