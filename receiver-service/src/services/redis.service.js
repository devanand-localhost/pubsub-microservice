const redis = require("redis");

let publisher;

const connectRedis = async () => {
  publisher = redis.createClient({
    url: process.env.REDIS_URL || "redis://redis:6379",
  });

  await publisher.connect();
  return publisher;
};

const publishMessage = async (channel, message) => {
  try {
    if (!publisher || !publisher.isOpen) {
      await connectRedis();
    }
    await publisher.publish(channel, JSON.stringify(message));
    console.log(`Message published to channel ${channel}`);
  } catch (error) {
    console.error("Error publishing message:", error);
    throw error;
  }
};

module.exports = {
  connectRedis,
  publishMessage,
};
