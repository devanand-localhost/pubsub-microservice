const mongoose = require("mongoose");
const { subscribeToChannel } = require("./services/redis.service");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://mongodb:27017/pubsub")
  .then(() => {
    console.log("Connected to MongoDB");

    // Start listening to Redis events
    subscribeToChannel("user_created")
      .then(() => console.log("Subscribed to Redis channel: user_created"))
      .catch((err) => console.error("Redis subscription error:", err));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
