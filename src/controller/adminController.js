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

exports.register = (req, res, next) => {
  user.register(
    new user({ email: req.body.email, name: req.body.name }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render("elfijr-user-register");
      }
      //   next(); // pass to authController.login
      console.log("user successfully registered");
    }
  );
};

exports.fourorfour = (req, res) => {
  res.render("404", {
    title: "404",
    name: "created by @InstaDoc",
    errorMessage: "Page Not Found",
  });
};
