import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import YourListings from "../components/YourListings";
import "../styles/ProfilePage.css";
import "../scripts/particles.js";

const ProfilePage = () => {
  const { user, setUser, logout } = useUser();
  const [propertiesListed, setPropertiesListed] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    profilePicture: user?.profilePicture || "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        console.log("User profile fetched:", response.data);
        setUser(response.data); // Update user context
      } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        alert("Failed to fetch user profile. Please try again.");
      }
    };
  
    const fetchUserData = async () => {
      try {
        // Fetch properties listed by the user
        const propertiesResponse = await axios.get(
          `http://localhost:5000/api/properties?email=${user?.email}`,
          { withCredentials: true }
        );
        console.log("Properties fetched:", propertiesResponse.data);
        setPropertiesListed(propertiesResponse.data.length);
  
        // Fetch unread notifications count
        const notificationsResponse = await axios.get(
          `http://localhost:5000/api/notifications?email=${user?.email}`,
          { withCredentials: true }
        );
        console.log("Notifications fetched:", notificationsResponse.data);
        const unreadCount = notificationsResponse.data.filter((notif) => !notif.read).length;
        setUnreadNotifications(unreadCount);
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message);
        alert("Failed to fetch user data. Please try again.");
      }
    };
  
    if (user) {
      fetchUserData();
    } else {
      fetchUserProfile();
    }
  }, [user, setUser]);
  

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditFormData((prev) => ({ ...prev, profilePicture: imageUrl }));
      alert("Profile image updated successfully!");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    const { profilePicture, ...dataToSend } = editFormData;
  
    if (!dataToSend.password) {
      delete dataToSend.password; // Exclude password if unchanged
    }
  
    try {
      console.log("Submitting Edit Form Data:", dataToSend);
  
      // Update the profile in the backend
      await axios.put("http://localhost:5000/api/users/profile", dataToSend, {
        withCredentials: true,
      });
  
      // Fetch the updated profile
      const updatedUser = await axios.get("http://localhost:5000/api/users/profile", {
        withCredentials: true,
      });
  
      // Update the user in the context
      setUser(updatedUser.data);
  
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Failed to update profile.");
    }
  };
  
  
  

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <div className="profile-hero">
        <div id="particles-js"></div>
        <div className="profile-hero-content">
          <h1>Welcome back, {user?.username || "User"}!</h1>
          <p>Manage your profile, listings, and notifications here.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-main">
        <div className="profile-row">
          {/* Left Section */}
          <div className="profile-left">
            {isEditing ? (
              <div className="profile-card">
                <form onSubmit={handleEditSubmit}>
                  <h2>Edit Profile</h2>
                  <label>
                    Username:
                    <input
                      type="text"
                      name="username"
                      value={editFormData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      type="password"
                      name="password"
                      value={editFormData.password}
                      onChange={handleInputChange}
                      placeholder="Leave blank to keep current password"
                    />
                  </label>
                  <label>
                    Profile Picture:
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <div className="edit-buttons">
                    <button type="submit" className="save-button">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="profile-card">
                <div className="profile-picture-container">
                  <img
                    src={user?.profilePicture || "/assets/Profile.jpg"}
                    alt="Profile"
                    className="profile-picture"
                  />
                  <p>{user?.username}</p>
                  <p>{user?.email}</p>
                </div>
                <div className="stats">
                  <p>
                    <strong>Properties Listed:</strong> {propertiesListed}
                  </p>
                  <p>
                    <strong>Unread Notifications:</strong> {unreadNotifications}
                  </p>
                </div>
                <button onClick={handleEditToggle} className="edit-profile-button">
                  Edit Profile
                </button>
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
                <button onClick={() => alert("Delete functionality coming soon!")} className="delete-profile-button">
                Delete Profile
                </button>

              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="profile-right">
            <div className="user-feedback">
              <h2>User Feedback</h2>
              <ul>
                <li>Great seller! Very professional.</li>
                <li>Property was exactly as described.</li>
                <li>Quick response and great communication!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="profile-listings">
          <YourListings userEmail={user?.email} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
