const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.get("/", adminController.loginForm);
router.get("/home", adminController.home);
router.get("/addDoctors", adminController.addDoctors);
router.get("/viewNotes", adminController.viewNotes);
router.get("/viewDoctors", adminController.viewDoctors);
routher.get("/*", adminController.fourorfour);

module.exports = router;
