import mongoose from "mongoose";

const LabTechSchema = new mongoose.Schema({
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
    enum: ["labtech", "doctor", "admin"] 
  },
  experience: { 
    type: Number, 
    // required: true 
  },
  qualification: { 
    type: String, 
    // required: true 
  },
  testConducted: [{ 
    type: String, 
  }],
  specializedIn: [{ 
    type: String, 
   }],
   bloodType: { type: String }
});
// Export the labtechnician model for use in other parts of the application
export default mongoose.model("LabTech", LabTechSchema);
