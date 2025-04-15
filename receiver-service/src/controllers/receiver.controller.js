const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const { validateUser } = require("../utils/validation");
const { publishMessage } = require("../services/redis.service");

const receiveData = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create new user with UUID and current timestamp
    const now = new Date();
    const newUser = new User({
      id: uuidv4(),
      user: value.user,
      class: value.class,
      age: value.age,
      email: value.email,
      inserted_at: now,
    });

    // Save to MongoDB
    await newUser.save();

    // Publish message to Redis
    await publishMessage("user_created", {
      id: newUser.id,
      user: newUser.user,
      class: newUser.class,
      age: newUser.age,
      email: newUser.email,
      inserted_at: newUser.inserted_at,
    });

    res.status(201).json({
      message: "Data received and processed successfully",
      id: newUser.id,
    });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Failed to process data" });
  }
};

module.exports = {
  receiveData,
};
