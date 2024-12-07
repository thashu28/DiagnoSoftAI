import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  doctor: { 
    type: mongoose.Types.ObjectId, 
    ref: "Doctor", 
    // required: true 
  },
  date: { 
    type: Date, 
    // required: true 
  },
  time: { 
    type: String, 
    // required: true 
  },
  condition: { 
    type: String, 
    enum: ["Critical", "Stable", "Routine"], 
    // required: true 
  },
  description: { 
    type: String, 
    default: "" 
  }
});

const TestReportSchema = new mongoose.Schema({
  testType: { 
    type: String, 
    enum: ["Blood Test", "Cholesterol Test", "Urine Test", "Glucose Test", "Other"], 
    required: true 
  },
  fileUrl: { 
    type: String, 
    // required: true 
  },
  description: { 
    type: String, 
    default: "" 
  },
  requestedBy: { 
    type: mongoose.Types.ObjectId, 
    ref: "Doctor", 
    required: true // Reference to the doctor who requested the report
  },
  uploadDate: { 
    type: Date, 
    default: Date.now 
  },
  priority: { 
    type: String, 
    enum: ["normal", "High"], 
    default: "normal" 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Completed"], 
    default: "Pending" 
  },
  comments: { 
    type: String, 
    default: "" // Comments from the lab technician
  }
});

const MRIScanSchema = new mongoose.Schema({
  scanType: { 
    type: String, 
    enum: ["Brain", "Spine", "Abdomen", "Pelvis", "Other"], // Common MRI types
    required: true 
  },
  fileUrl: { 
    type: String, 
    // required: true 
  },
  description: { 
    type: String, 
    default: "" 
  },
  requestedBy: { 
    type: mongoose.Types.ObjectId, 
    ref: "Doctor", 
    // required: true // Reference to the doctor who requested the scan
  },
  uploadDate: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Completed"], 
    default: "Pending" 
  },
  priority: { 
    type: String, 
    enum: ["normal", "High"], 
    default: "normal" 
  },
  comments: { 
    type: String, 
    default: "" // Comments from the lab technician
  },
  diagnosis: { 
    type: String, 
    default: "", // Initially empty; will be assigned either automatically or by the doctor
  },
  report: { 
    type: String, 
    default: "", // This can store a detailed report of the scan interpretation
  }
});


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
    // required: true 
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
    // required: true, 
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
  appointments: [AppointmentSchema], // Embedded Appointment schema
  mriScans: [MRIScanSchema], // Embedded MRI schema
  testReports: [TestReportSchema], // Embedded Lab Request schema
});
// Export the patient model for use in other parts of the application
export default mongoose.model("Patient", PatientSchema);
