import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Patient from "../models/patientSchema.js";
import LabTech from "../models/LabTechSchema.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );
};

// Signup Controller
export const signup = async (req, res) => {
  const { email, password, name, phone, role, age, gender, bloodType } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      role,
      age,
      gender,
      bloodType,
    });

    // Save the new user
    await newUser.save();

    // Save user in role-specific schema
    if (role === "doctor") {
      const doctor = new Doctor({
        email,
        password: hashedPassword,
        name,
        phone,
        role,
        age,
        gender,
        bloodType,
      });
      await doctor.save();
    } else if (role === "labtech") {
      const labTech = new LabTech({
        email,
        password: hashedPassword,
        name,
        phone,
        role,
        age,
        gender,
        bloodType,
      });
      await labTech.save();
    } else if (role === "patient") {
      const patient = new Patient({
        email,
        password: hashedPassword,
        name,
        phone,
        role,
        age,
        gender,
        bloodType,
      });
      await patient.save();
    }
    
    // Generate a token
    const token = generateToken(newUser);

    // Send response to the client
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    // Log and send an error response
    console.error(error);
    return res.status(500).json({ success: false, message: "Signup failed", error });
  }
};


// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Compare the plain password with the hashed password in the database
    // #const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

    // Generate a token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed", error });
  }
};
