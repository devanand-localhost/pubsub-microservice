const redis = require("redis");
const ProcessedUser = require("../models/processed-user.model");

let subscriber;

const connectRedis = async () => {
  subscriber = redis.createClient({
    url: process.env.REDIS_URL || "redis://redis:6379",
  });

  await subscriber.connect();
  return subscriber;
};

const processMessage = async (message) => {
  try {
    const userData = JSON.parse(message);

    // Create a new processed user with the original data plus current timestamp
    const processedUser = new ProcessedUser({
      ...userData,
      modified_at: new Date(),
    });

    // Save to MongoDB
    await processedUser.save();
    console.log(`Processed user with ID: ${userData.id}`);
  } catch (error) {
    console.error("Error processing message:", error);
  }
};

const subscribeToChannel = async (channel) => {
  try {
    if (!subscriber || !subscriber.isOpen) {
      await connectRedis();
    }

    await subscriber.subscribe(channel, (message) => {
      console.log(`Received message from channel ${channel}`);
      processMessage(message);
    });
  } catch (error) {
    console.error("Error subscribing to channel:", error);
    throw error;
  }
};

module.exports = {
  connectRedis,
  subscribeToChannel,
};
