import axios from 'axios';

const API_URL = "http://localhost:5001"; // Replace with your actual backend URL if different

const HTTPCommon = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default HTTPCommon;
