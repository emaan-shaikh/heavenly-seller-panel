// UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser  = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser ] = useState(() => {
    const storedUser  = localStorage.getItem('user');
    return storedUser  ? JSON.parse(storedUser ) : null;
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', { withCredentials: true });
        setUser (response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
        setUser (null);
        localStorage.removeItem('user');
      }
    };

    // Only fetch user profile if user is not already set
    if (!user) {
      fetchUserProfile();
    }
  }, []); // Dependency on user state

  return (
    <UserContext.Provider value={{ user, setUser  }}>
      {children}
    </UserContext.Provider>
  );
};