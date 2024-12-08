const User = require("../models/User");

const getNotifications = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email }).select("notifications");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user.notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

const markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { "notifications._id": id },
      { $set: { "notifications.$.read": true } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "Notification not found" });

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};

const approveRequest = async (req, res) => {
  const { notificationId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { "notifications._id": notificationId },
      { $set: { "notifications.$.type": "approved" } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "Notification not found" });

    res.status(200).json({ message: "Request approved" });
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ error: "Failed to approve request" });
  }
};

module.exports = { getNotifications, markAsRead, approveRequest };
