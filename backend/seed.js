import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/UserSchema.js";
import Patient from "./models/patientSchema.js";
import Doctor from "./models/DoctorSchema.js";
import LabTech from "./models/LabTechSchema.js";
import userData from "./data_Seed/user_data.js";
import patientData from "./data_Seed/patient_data.js";
import doctorData from "./data_Seed/doctor_data.js";
import labTechData from "./data_Seed/labtech_data.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");

    // Remove all existing records from the collections
    await User.deleteMany();
    console.log("Existing users removed");

    await Patient.deleteMany();
    console.log("Existing patients removed");

    await Doctor.deleteMany();
    console.log("Existing doctors removed");

    await LabTech.deleteMany();
    console.log("Existing lab technicians removed");

    // Insert new data
    await User.insertMany(userData);
    console.log("Users seeded successfully");

    await Patient.insertMany(patientData);
    console.log("Patients seeded successfully");

    await Doctor.insertMany(doctorData);
    console.log("Doctors seeded successfully");

    await LabTech.insertMany(labTechData);
    console.log("Lab technicians seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
