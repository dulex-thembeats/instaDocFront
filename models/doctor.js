const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doctorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
    trim: true,
  },

  phone_number: {
    type: String,
    required: true,
    trim: true,
  },

  specialization: {
    type: String,
    required: true,
  },

  doctor_bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password cannot be accepted as password");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  image: String,
  image_id: String,
});

// there is another method where you will use a declared function instead of the toJSON object..
doctorSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

doctorSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//custom comparison for login
doctorSchema.statics.findByCredentials = async (email, password) => {
  const User = await doctor.findOne({ email });
  if (!User) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, User.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return User;
};

// hash the plain text password before saving
doctorSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

doctorSchema.statics.getCategoriesList = function () {
  return this.aggregate([
    //here we're destructuring the field
    { $unwind: "$specialization" },
    //here we're grouping each restructured data
    { $group: { _id: "$specialization", count: { $sum: 1 } } },
    //and lastly we're grouping them by most popular
    { $sort: { count: -1 } },
  ]);
};

const doctor = mongoose.model("doctor", doctorSchema);

module.exports = doctor;
