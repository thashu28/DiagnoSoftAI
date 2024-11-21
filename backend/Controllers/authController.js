import axios from 'axios';

// API endpoint for backend (adjust based on your server setup)
const API_URL = "http://localhost:5000/api/auth"; // Change this to your actual backend URL

// Helper to store token in localStorage or sessionStorage
const storeToken = (token) => {
  localStorage.setItem("authToken", token); // Or sessionStorage, based on your preference
};

// Helper to get the stored token
const getToken = () => {
  return localStorage.getItem("authToken");
};

// Helper to remove the stored token (logout)
const removeToken = () => {
  localStorage.removeItem("authToken");
};

// Signup function
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    if (response.data.success) {
      storeToken(response.data.token); // Store the token after successful signup
      return response.data; // Return the response from the server
    }
  } catch (error) {
    console.error("Signup Error:", error.response ? error.response.data : error.message);
    throw error; // Propagate error to be handled by calling function
  }
};

// Login function
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.success) {
      storeToken(response.data.token); // Store the token after successful login
      return response.data; // Return the response from the server
    }
  } catch (error) {
    console.error("Login Error:", error.response ? error.response.data : error.message);
    throw error; // Propagate error to be handled by calling function
  }
};

// Function to check if user is authenticated (i.e., if token exists)
export const isAuthenticated = () => {
  const token = getToken();
  return token ? true : false;
};

// Function to get the current logged-in user (decode the JWT token if necessary)
export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;

  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
  return decodedToken;
};

// Logout function
export const logout = () => {
  removeToken(); // Remove token to log the user out
};
