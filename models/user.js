const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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

//this is a virtual property that is not stored on the database but an important property for the database to know which user owns which task
userSchema.virtual("appointments", {
  ref: "appointments",
  //this is where the local data is stored
  localField: "_id",
  //this is what sets the relationship
  foreignField: "owner",
});

// there is another method where you will use a declared function instead of the toJSON object..
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//custom comparison for login
userSchema.statics.findByCredentials = async (email, password) => {
  const User = await user.findOne({ email });
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
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const user = mongoose.model("user", userSchema);

module.exports = user;
