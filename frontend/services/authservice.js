import HTTPCommon from "../helpers/httpcommon";
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
    const response = await HTTPCommon.post('/api/auth/signup', userData); // Use HTTPCommon instance
    if (response.data.success) {
      storeToken(response.data.token); // Store the token after successful signup
      return response.data; // Return the response from the server
    }
  } catch (error) {
    console.error("Signup Error:", error.response ? error.response.data : error.message);
    throw error; // Propagate error to be handled by calling function
  }
};

export const login = async (credentials) => {
  try {
    console.log("Logging in with credentials:", credentials);
    const response = await HTTPCommon.post('/api/auth/login', credentials);
    console.log("Login response:", response);
    if (response.data.success) {
      storeToken(response.data.token);
      return response.data;
    } else {
      console.error("Login failed, no success flag");
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error("Login Error:", error.response ? error.response.data : error.message);
    throw error;
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

  // Decode the JWT token (assuming it follows the JWT structure)
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
  return decodedToken;
};

// Logout function
export const logout = () => {
  removeToken(); // Remove token to log the user out
};
