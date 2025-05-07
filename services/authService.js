const crypto = require("crypto");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/sendEmail");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");

const createToken = require("../utils/createToken");
const createLog = require("../utils/createLog");

// Signup
exports.signup = asyncHandler(async (req, res, next) => {
  //1) create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    department: req.body.department,
  });

  //2) Generate JWT token
  const token = createToken(user._id);
  // await createLog(req.user.name, `قام المستخدم ${req.user.name} بأضافة مستخدم جديد`, "اضافة")


  res.status(201).json({ data: user, token });
});

// Login
exports.login = asyncHandler(async (req, res, next) => {
  // 1) Check if email and password exist
  const user = await User.findOne({ email: req.body.email });

  // 2) Check if user exists && password is correct
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  // 3) Generate JWT token
  const token = createToken(user._id);

  // 4) Log the login action after verifying the user
  await createLog(user.name, `قام المستخدم ${user.name} بتسجيل الدخول`, "تسجيل الدخول");

  // 5) Send response to client side
  res.status(200).json({ data: user, token });
});


// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist if exist get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("You are not logged in", 401));
  }
  // 2) Verify token (no change happened, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError("The user that belong this token does not exist", 401)
    );
  }
  // 4) Check if user changed password after token create
  if (currentUser.passwordChangeAt) {
    const passwordChangedTimeStamp = parseInt(
      currentUser.passwordChangeAt.getTime() / 1000,
      10
    );
    if (passwordChangedTimeStamp > decoded.iat) {
      return next(new ApiError("User recently changed password", 401));
    }
  }
    // 4) Check if user is active
    if (!currentUser.active) {
      return next(new ApiError("Your account has been deactivated. Please contact support.", 403));
    }
  
    // 5) Attach user to request
    req.user = currentUser;
    next();
});

// Restrict access to specific roles
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registerd user
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You do not have permission to access this route", 403)
      );
    }
    next();
  });

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("There is no user with email address", 404));
  }
  // 2) If user exixt, Generate reset random 6 digits and save it in DB
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  // Save hashed reset code in DB
  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();

  const message = `Hi ${user.name}, \n\n Your password reset code is: ${resetCode}. \n\n If you did not request this, please ignore this email.`;
  // 3) Send reset code to user email
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset code (valid for 10 minutes)",
      message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return next(new ApiError("There was an error sending the email", 500));
  }
  res.status(200).json({ status: "success" });
});

exports.verifyPasswordResetCode = asyncHandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError("Reset code invalid or expired"));
  }

  // 2) Reset code valid
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: "Success",
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new ApiError("There is no user with email address", 404));
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError("Reset code not verified", 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  const token = createToken(user._id);

  res.status(200).json({ token });
});
