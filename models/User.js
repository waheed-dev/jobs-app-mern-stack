import mongoose from "mongoose";
import validator from "validator";

const Userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,

    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minLength: 6,
  },
  location: {
    type: String,
    required: true,
    minLength: 2,
    default: "my city",
  },
});
export default mongoose.model("User", Userschema);
