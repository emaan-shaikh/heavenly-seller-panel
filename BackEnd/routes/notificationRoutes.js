const express = require("express");
const { getNotifications, markAsRead, approveRequest } = require("../controllers/notificationController");

const router = express.Router();

router.get("/", getNotifications);
router.patch("/:id", markAsRead);
router.post("/approve", approveRequest);

module.exports = router;
