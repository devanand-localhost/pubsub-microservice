const express = require("express");
const receiverController = require("../controllers/receiver.controller");
const { apiKeyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/receiver", apiKeyAuth, receiverController.receiveData);

module.exports = router;
