const passport = require("passport");

exports.login = passport.authenticate("local", {
  successRedirect: "/home", // redirect to the secure profile section
  failureRedirect: "/", // redirect back to the signup page if there is an error
  failureFlash: true, // allow flash messages
});

exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "You are now logged out! 👋");
  res.redirect("/");
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  req.flash("error", "Oops you must be logged in to do that!");
  res.redirect("/elfijr-user-login");
};
