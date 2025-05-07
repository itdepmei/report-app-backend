const express = require("express");
const {
  signUpValidator,
  loginValidator,
} = require("../utils/validators/authValidator");


const { signup, login, forgotPassword, verifyPasswordResetCode, resetPassword, protect, allowedTo } = require("../services/authService");

const router = express.Router();

router.post("/signup", signUpValidator, signup);
router.post("/login", loginValidator, login);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyResetCode", verifyPasswordResetCode);
router.put("/resetPassword", resetPassword);
// router
//   .route("/:id")
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

module.exports = router;
