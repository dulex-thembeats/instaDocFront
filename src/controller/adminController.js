const admin = require("../models/admin");

exports.loginForm = (req, res) => {
  res.render("login");
};

exports.home = (req, res) => {
  res.render("index");
};

exports.addDoctors = (req, res) => {
  res.render("addDoctors");
};

exports.viewNotes = (req, res) => {
  res.render("viewNotes");
};

exports.viewDoctors = (req, res) => {
  res.render("viewDoctors");
};

exports.fourorfour = (req, res) => {
  res.render("404", {
    title: "404",
    name: "created by @InstaDoc",
    errorMessage: "Page Not Found",
  });
};
