const admin = require("../models/admin");
var axios = require("axios");

exports.registerDoctor = (req, res) => {
  const body = req.body;
  var data = JSON.stringify(body);

  var config = {
    method: "post",
    url: "localhost:3000/doctors/register",
    headers: {
      // Authorization:
      // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDYxZTM1N2E1ZjllMTEzNzI2YTc2ODEiLCJpYXQiOjE2MTcwMjc5NzJ9.A9hAqBtGZh-ORVA-uxO2A2t4LKmjHEA-PM6HsH9WXa8",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

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

exports.registerForm = (req, res) => {
  res.render("adminRegister", {
    message: "This place is hidden",
  });
};

exports.register = (req, res, next) => {
  admin.register(
    new admin({ email: req.body.email, name: req.body.name }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render("adminRegister");
      }
      next(); // pass to authController.login
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
