const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const authController = require("../controller/authController");

router.get("/", adminController.loginForm);
router.get("/home", adminController.home);
router.get("/addDoctors", adminController.addDoctors);
router.get("/viewNotes", adminController.viewNotes);
router.get("/viewDoctors", adminController.viewDoctors);
router.get("/*", adminController.fourorfour);

//user post routes
router.post("/register", adminController.register, adminController.home);
router.post("/login", authController.login);

module.exports = router;
