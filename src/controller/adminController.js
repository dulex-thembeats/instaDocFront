const admin = require("../models/admin");
var axios = require("axios");

exports.registerDoctor = (req, res) => {
  var body = req.body;
  var data = JSON.stringify(body);

  var config = {
    method: "post",
    url: "https://dulex-instadoc.herokuapp.com/doctors/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      const firstname = JSON.stringify(response.data.firstname);
      const lastname = JSON.stringify(response.data.lastname);
      const fullname = `${firstname} ${lastname}`;
      res.render("success", { fullname });
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      res.render("failure", {
        message: "Either user already exists or password too short",
      });
      console.log(error.response.data.name);
      console.log(error.response.data.message);
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
