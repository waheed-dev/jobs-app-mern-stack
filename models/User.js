import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
    required: false,
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
    select : false
  },
  location: {
    type: String,
    required: true,
    minLength: 2,
    default: "my city",
  },
});

Userschema.pre('save',  async  function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)

})

Userschema.methods.createJWT = function () {
 return  jwt.sign({userId : this._id}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}

Userschema.methods.comparePasswords = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}
export default mongoose.model("User", Userschema);
