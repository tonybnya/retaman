import redis from "redis";

// create Redis client
const client = redis.createClient();

// connect to Redis
// properly handling the Redis v4+ async API
const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Redis Server Connected...");
  } catch (err) {
    console.error("Redis connection error:", err);
    process.exit(1);
  }
};

// Handle Redis errors
client.on("error", (err) => {
  console.error("Redis error:", err);
});

export { client, connectRedis };
