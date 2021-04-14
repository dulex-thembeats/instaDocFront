const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const authController = require("../controller/authController");

router.get("/", adminController.loginForm);
router.get("/registerForm", adminController.registerForm);
router.get("/home", authController.isLoggedIn, adminController.home);
router.get(
  "/addDoctors",
  authController.isLoggedIn,
  adminController.addDoctors
);
router.get("/viewNotes", authController.isLoggedIn, adminController.viewNotes);
router.get(
  "/viewDoctors",
  authController.isLoggedIn,
  adminController.viewDoctors
);
router.get("/*", adminController.fourorfour);

//user post routes
router.post("/register", adminController.register, adminController.home);
router.post("/login", authController.login);

router.post("/addDoctors", adminController.registerDoctor);

module.exports = router;
