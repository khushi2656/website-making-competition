const redis = require('redis');

let redisClient;

const connectRedis = async () => {
  // Reuse existing connection (critical for serverless cold starts)
  if (redisClient && redisClient.isOpen) return;

  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL
    });

    redisClient.on('error', (err) => {
      console.error('Redis Error:', err.message);
    });

    await redisClient.connect();
    console.log('Redis Connected');
  } catch (error) {
    console.error(`Redis Connection Error: ${error.message}`);
    redisClient = null; // Allow app to work without cache
  }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };
