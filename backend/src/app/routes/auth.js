const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/authenticate", authController.authenticate);
router.post("/forgot_password", authController.forgotPassword);
router.post("/forgot_password", authController.forgotPassword);
router.get("/users", authController.loadAll);

module.exports = app => app.use("/auth", router);
