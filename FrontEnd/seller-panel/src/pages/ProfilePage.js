import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { user, setUser, logout } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    username: user?.username || "",
    email: user?.email || "",
    imageUrls: user?.imageUrls || "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth"); // Redirect if not logged in
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/api/users/profile", updatedProfile, { withCredentials: true })
      .then((response) => {
        setUser(response.data); // Update user context
        setIsEditing(false);
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setError("Failed to update profile. Please try again.");
      });
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      axios
        .delete("http://localhost:5000/api/users/profile", { withCredentials: true })
        .then(() => {
          logout(); // Clear user context
          navigate("/auth"); // Redirect to auth page
        })
        .catch((err) => {
          console.error("Error deleting profile:", err);
          setError("Failed to delete profile. Please try again.");
        });
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <h1 className="profile-title">Your Profile</h1>
      <div className="profile-container">
        <div className="profile-picture-section">
          <img
            src={updatedProfile.imageUrls || "/default-avatar.png"}
            alt="User Avatar"
            className="profile-picture"
          />
          {isEditing && (
            <label>
              Update Profile Picture:
              <input
                type="text"
                name="imageUrls"
                value={updatedProfile.imageUrls}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </label>
          )}
        </div>
        <div className="profile-details-section">
          {isEditing ? (
            <form className="profile-edit-form" onSubmit={handleSaveChanges}>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={updatedProfile.username}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={updatedProfile.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit" className="save-changes-button">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-edit-button"
                onClick={handleEditToggle}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button
                className="edit-profile-button"
                onClick={handleEditToggle}
              >
                Edit Profile
              </button>
            </>
          )}
          <button
            className="delete-profile-button"
            onClick={handleDeleteProfile}
          >
            Delete Profile
          </button>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ProfilePage;
