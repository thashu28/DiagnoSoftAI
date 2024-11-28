import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
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
  specialization: { 
    type: String, 
    // required: true 
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
    enum: ["doctor", "admin", "patient"] 
  },
  experience: { 
    type: Array, 
    of: String, 
    // required: true 
  },
  appointments: [{ 
    type: mongoose.Types.ObjectId, 
    ref: "Appointment" 
  }],
  // New fields
  qualifications: {
    type: Array, 
    of: String, 
    // required: true 
  },
  bloodType: { type: String },
  department: {
    type: String,
    // required: true,
  },
});

export default mongoose.model("Doctor", DoctorSchema);
