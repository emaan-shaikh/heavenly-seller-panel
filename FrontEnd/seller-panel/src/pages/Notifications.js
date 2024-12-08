import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import axios from "axios";
import "../styles/Notifications.css";
import { useUser } from "../contexts/UserContext";

const Notifications = () => {
  const { user } = useUser(); // Get user from context
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return; // Wait for user email to be available

    axios
      .get(`http://localhost:5000/api/notifications?email=${user.email}`)
      .then((response) => setNotifications(response.data))
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications.");
      });
  }, [user]);

  const markAsRead = (notificationId) => {
    axios
      .patch(`http://localhost:5000/api/notifications/${notificationId}`)
      .then(() => {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, read: true } : notif
          )
        );
      })
      .catch((err) => console.error("Error marking notification as read:", err));
  };

  const approveRequest = (notificationId) => {
    axios
      .post(`http://localhost:5000/api/notifications/approve`, {
        notificationId,
      })
      .then(() => {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, type: "approved" } : notif
          )
        );
        navigate("/next-steps", {
          state: {
            buyerEmail: "buyer@example.com", // Replace with dynamic email if available
            message: "You’ve successfully approved the request!",
          },
        });
      })
      .catch((err) => console.error("Error approving request:", err));
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading user data...</p>;
  if (notifications.length === 0) return <p>No notifications to display.</p>;

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>
      <div className="notifications-container">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className={`notification-card ${notification.read ? "read" : ""}`}
          >
            <p className="notification-message">{notification.message}</p>
            <p className="notification-date">
              {new Date(notification.date).toLocaleString()}
            </p>
            {!notification.read && (
              <button
                className="mark-as-read-button"
                onClick={() => markAsRead(notification._id)}
              >
                Mark as Read
              </button>
            )}
            {notification.type === "sale" && (
              <button
                className="approve-request-button"
                onClick={() => approveRequest(notification._id)}
              >
                Approve Request
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

