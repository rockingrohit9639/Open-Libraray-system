const userController = require("../controller/user-controller")
const express = require('express');
const router = express.Router();
const multer = require("multer");
const authenticate = require("../middleware/authentication")

router.post("/register", multer().none(), userController.register);
router.post("/login", multer().none(), userController.login);
router.post("/forget", multer().none(), userController.forget);
router.post("/validate_forget", authenticate, multer().none(), userController.validateForget);
router.post("/resend_forget", authenticate, multer().none(), userController.resendForget);
router.post("/reset_password", authenticate, multer().none(), userController.resetPassword);
router.post("/change_password", authenticate, multer().none(), userController.changePassword);

module.exports = router;
