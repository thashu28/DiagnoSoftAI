import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String,
    validate: {
      validator: (v) => 
        /^(\+1\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/.test(v),
      message: (props) => `${props.value} is not a valid USA phone number!`,
    },
  },
  role: { 
    type: String,
    enum: ["patient", "admin", "doctor", "labtech"],
    default: "patient" 
  },
  age: { type: Number },
  gender: { type: String, enum: ["male", "female"] },
  bloodType: { type: String }
});

export default mongoose.model("User", UserSchema);
