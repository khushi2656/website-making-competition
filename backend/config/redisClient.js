const redis = require('redis');

let redisClient;

const connectRedis = async () => {
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
    process.exit(1);
  }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };
