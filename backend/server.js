import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import your routes
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import reviewRoute from "./routes/review.js";

// Config
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: true, // Allows all origins, adjust if needed
};

// Middleware
app.use(express.json()); // Handles JSON requests
app.use(cookieParser()); // Parses cookies from request headers
app.use(cors(corsOptions)); // Handles CORS

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/reviews", reviewRoute);

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};

// Connect to database and start server
app.get("/", (req, res) => {
  res.send("DiagnosoftAI Connected");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
