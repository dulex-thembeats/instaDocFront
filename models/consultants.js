const express = require("express");
const doctor = require("../models/doctor");
const docAuth = require("../middleware/docAuth");

// const multer = require("multer");
// const cloudinary = require("cloudinary");
require("dotenv").config({ path: "variables.env" });
// const sharp = require("sharp");
const router = new express.Router();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// const upload = multer({
//   dest: "myuploads/",
//   limits: {
//     fileSize: 3000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(pdf|docx|pptx|jpg|jpeg|png)$/)) {
//       return cb(new Error("Please upload an image file"));
//     }
//     cb(undefined, true);
//   },
// });

router.post("/consultants/register", adminAuth, async (req, res) => {
  const users = new doctor(req.body);
  try {
    await users.save();
    res.status(201).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

// router.post("/users/me/avatar", upload.single("upload"), async (req, res) => {
//   const File = req.file.path;
//   cloudinary.uploader.upload(File, async (result) => {
//     const users = new user({
//       image: result.url,
//       image_id: result.public_id,
//     });

//     try {
//       await users.save();
//       res.status(201).send(users);
//     } catch (e) {
//       res.status(400).send(e);
//     }
//   });
// });

router.post("/consultants/login", async (req, res) => {
  try {
    const doctors = await doctor.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await doctors.generateAuthToken();
    res.status(201).send({
      doctors,
      token,
    });
  } catch (e) {
    res.status(200).json({
      status: "failed",
      message: "incorrect username or password check again",
    });
  }
});

// router.get("/profile/:id", auth, async (req, res) => {
//   const profile = req.params.id;
//   try {
//     const docQuery = await doctor.findOne({ _id: profile });
//     res.status(200).send(docQuery);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

// router.get("/specialization", auth, async (req, res) => {
//   const doctors = await doctor.getCategoriesList();
//   res.json(doctors);
// });

// router.get("/specialization/:id", auth, async (req, res) => {
//   const specialization = req.params.id;
//   const specializationPromise = doctor.getCategoriesList();
//   try {
//     const doctorPromise = doctor.find({ specialization: specialization });
//     const [specialty, doctors] = await Promise.all([
//       specializationPromise,
//       doctorPromise,
//     ]);
//     res.json({ specialty, doctors });
//   } catch (e) {
//     res.status(500).send();
//   }
// });

router.get("/doctors/me", docAuth, async (req, res) => {
  res.send(req.User);
});

router.post("/doctors/logout", docAuth, async (req, res) => {
  try {
    req.User.tokens = req.User.tokens.filter((tokens) => {
      return tokens.token !== req.token;
    });
    await req.User.save();
    res.send();
  } catch (e) {
    res.status(500).save();
  }
});

//will come in handy later run in the project
router.post("/doctors/logoutAll", docAuth, async (req, res) => {
  try {
    req.User.tokens = [];
    await req.User.save();
    res.send();
  } catch (e) {
    res.status(500).save();
  }
});

module.exports = router;
