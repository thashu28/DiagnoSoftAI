import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true 
  },
  dob: { 
    type: Date, 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ["male", "female", "other"], 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true, 
    validate: {
      validator: (v) => 
        /^(\+1\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  role: { 
    type: String, 
    required: true, 
    enum: ["patient", "doctor", "admin"] 
  },
  bloodType: { 
    type: String, 
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    required: true 
  },
  medicalHistory: { 
    type: [String], 
    default: [] 
  },
  allergies: { 
    type: [String], 
    default: [] 
  },
  currentMedication: { 
    type: [String], 
    default: [] 
  },
  appointments: [{ 
    type: mongoose.Types.ObjectId, 
    ref: "Appointment" 
  }],
  testTaken: [{ 
    type: [String], required: true 
  }],
  reports: [{ 
    type: mongoose.Types.ObjectId, 
    ref: "Report" 
  }],
});

export default mongoose.model("Patient", PatientSchema);
