import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create a Context for the User
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserContext provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend API when the app loads
    axios.get("http://localhost:3000/api/users/profile", { withCredentials: true })
      .then(response => {
        setUser(response.data); // Update user state if data is available
      })
      .catch(error => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
