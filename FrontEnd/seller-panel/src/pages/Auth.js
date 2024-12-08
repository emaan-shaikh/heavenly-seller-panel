import React, { useState, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';

import axios from 'axios';
import '../styles/Auth.css'; // Assuming you're using a separate CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Loader from '../components/Loader'; // Import the Loader component
import { useLocation } from 'react-router-dom'; // Add this import

import { useUser } from "../contexts/UserContext"; // Import the UserContext


const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Start with Sign In form visible
  const [message, setMessage] = useState(''); // For error/success messages
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [formVisible, setFormVisible] = useState(true); // Controls visibility of the auth container
  const [showContainer, setShowContainer] = useState(false);



  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Default to login for

  const { setUser } = useUser();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/auth"; // Redirect from where the user came from
  const navigate = useNavigate();




  // Page load transition handler
  const handlePageLoad = () => {
    setTimeout(() => {
      setShowContainer(true);
    }, 1000); // Delay for page load transition
  };

  // Trigger page load transition after component mounts
  useEffect(() => {
    handlePageLoad();
  }, []);


  // Toggle the form between Sign In and Sign Up
  const toggleAuthForm = () => {
    setIsSignUp((prev) => !prev); // Toggle between Sign In and Sign Up
    setMessage('');
    setEmailError('');
    setPasswordError('');
    setUsernameError('');
  };

  // Validate email format (must have .com or .edu or other domains)
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu)$/;
    return emailPattern.test(email);
  };

  // Validate password (must be at least 8 characters)
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Validate fields before form submission
  const validateFields = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setUsernameError('');

    // Email validation
    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email (e.g., example@gmail.com)');
      isValid = false;
    }

    // Password validation
    if (!password || !validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    }

    // Username validation (only for signup)
    if (isSignUp && !username) {
      setUsernameError('Username cannot be empty');
      isValid = false;
    }

    return isValid;
  };
 
  useEffect(() => {
    console.log("hehe token");

    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      console.log(token);
      navigate(from, { replace: true }); // Navigate to the "from" page or default '/'
    }
  }, [navigate, from]); // `from` should be a dependency here

   // Handle form submit (either login or signup)

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form fields before submitting
    if (!validateFields()) return;
  
    setFormVisible(false);
    setLoading(true);
  
    // Check if it is a sign-up or login request
    const url = isSignUp ? "http://localhost:5000/api/auth/signup" : "http://localhost:5000/api/auth/login";
    const data = isSignUp
      ? { email, username, password }
      : { email, password };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      // If the response is successful, handle the login/signup
      if (response.status === 200 || response.status === 201) {
        document.cookie = `token=${result.token}; path=/`; 
        // setUser({ email, username: isSignUp ? username : result.user.username }); // Set user data
        const userData = { email, username: isSignUp ? username : result.user.username };
        setUser (userData); // Set user data in context
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
        navigate("/seller-dashboard"); // Navigate to the profile page
      } else {
        // If there's an error, show it in an alert
        setError(result.message || "An unexpected error occurred.");
        alert(result.message || "An unexpected error occurred.");
      }
    } catch (err) {
      // If there's a server error, handle it here
      setError("Server error. Please try again later.");
      alert("Server error. Please try again later.");
    } finally {
      setTimeout(() => {
        setLoading(false); // Hide loading spinner after 3 seconds
      }, 3000);
    }
  };
  

   // Handle Google Login Success
   const handleGoogleSuccess = async (response) => {
    const { credential } = response; // This is the Google JWT token
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", { token: credential });
      document.cookie = `token=${res.data.token}; path=/`; // Store token
      setUser (res.data.user); // Update user context with the returned user data
      navigate("/seller-dashboard"); // Redirect to the profile page
    } catch (err) {
      console.error("Error with Google login", err);
      setError("Google login failed. Please try again.");
    }
  };

  // Handle input change for password (to clear error when typing)
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPasswordError(''); // Remove password error if it becomes valid
    }
  };

  // Handle input change for email (to clear error when valid email format is typed)
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setEmailError(''); // Remove email error if it's valid
    }
  };

  // Handle input change for username (to clear error when username is entered)
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.trim() !== '') {
      setUsernameError(''); // Remove username error if it's not empty
    }
  };

  return (
    <div className={`auth-container ${isSignUp ? 'active' : ''}`}>
            {loading && <Loader />} {/* Show loader when loading is true */}


      {/* Sign In Form */}
      <div className={`auth-form-container login-in ${!isSignUp ? 'active' : ''}`}>
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="auth-social-icons">
          <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google login failed")}
              theme="outline"
              useOneTap
            />
          </div>
          <span>or use your email password</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={emailError ? 'error' : ''}
          />
          {emailError && <small className="error-message">{emailError}</small>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className={passwordError ? 'error' : ''}
          />
          {passwordError && <small className="error-message">{passwordError}</small>}
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
          {loading && <Loader />} {/* Show loader when loading is true */}

        </form>
      </div>

      {/* Sign Up Form */}
      <div className={`auth-form-container sign-up ${isSignUp ? 'active' : ''}`}>
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="auth-social-icons">
          <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.log("Google login failed")}
        theme="outline"
        useOneTap
      />
            
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={handleUsernameChange}
            className={usernameError ? 'error' : ''}
          />
          {usernameError && <small className="error-message">{usernameError}</small>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={emailError ? 'error' : ''}
          />
          {emailError && <small className="error-message">{emailError}</small>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className={passwordError ? 'error' : ''}
          />
          {passwordError && <small className="error-message">{passwordError}</small>}
          <button type="submit">Sign Up</button>
          {loading && <Loader />} {/* Show loader when loading is true */}

        </form>
      </div>

      {/* Message */}
      <div className="auth-message">
        {message && <p>{message}</p>}
      </div>

      {/* Toggle Container */}
      <div className="auth-toggle-container">
        <div className="auth-toggle">
          <div className={`auth-toggle-panel auth-toggle-left ${!isSignUp ? 'active' : ''}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site's features</p>
            <button className="hidden" onClick={toggleAuthForm}>Sign In</button>
          </div>
          <div className={`auth-toggle-panel auth-toggle-right ${isSignUp ? 'active' : ''}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of the site's features</p>
            <button className="hidden" onClick={toggleAuthForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
