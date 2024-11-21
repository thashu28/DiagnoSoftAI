import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/UserSchema.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected!");

    // Clear existing data
    await User.deleteMany();

    // Add static data
    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: "123456",
        phone: "+1 123-456-7890",
        role: "admin",
        age: 30,
        gender: "male",
        bloodType: "O+"
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "123456",
        phone: "+1 987-654-3210",
        role: "patient",
        age: 25,
        gender: "female",
        bloodType: "A+"
      },
      {
        name: "Alice Brown",
        email: "alice@example.com",
        password: "123456",
        phone: "+1 456-789-1234",
        role: "doctor",
        age: 35,
        gender: "female",
        bloodType: "B-"
      },
    ];

    await User.insertMany(users);

    console.log("Static data added!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
