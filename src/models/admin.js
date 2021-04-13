const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
// const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please Supply an email address",
  },
  name: {
    type: String,
    required: "Please supply a name",
    trim: true,
  },
});

adminSchema.plugin(passportLocalMongoose, { usernameField: "email" });
adminSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("admin", adminSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
// const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please Supply an email address",
  },
  name: {
    type: String,
    required: "Please supply a name",
    trim: true,
  },
});

adminSchema.plugin(passportLocalMongoose, { usernameField: "email" });
adminSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("admin", adminSchema);