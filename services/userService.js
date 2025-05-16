const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const factory = require("./handlersFactory");

const ApiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddlware");

const createToken = require("../utils/createToken");

// Upload single image
exports.uploadUserImage = uploadSingleImage("profileImg");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);

    req.body.profileImg = filename;
  }

  next();
});

// Get all User
exports.getUsers = factory.getAll(User);

// Get specific User
exports.getUser = factory.getOne(User);
// Create User
exports.createUser = factory.createOne(User);

// Update specific User
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`document not found`, 404));
  }

  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangeAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`document not found`, 404));
  }

  res.status(200).json({ data: document });
});

// Delete specific User
exports.deleteUser = factory.deleteOne(User);

// Get logged user
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// Update logged user password
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const isPasswordCorrect = await bcrypt.compare(req.body.currentPassword, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "كلمة السر الحالية غير صحيحة" });
  }

  user.password = req.body.newPassword;
  user.passwordChangeAt = Date.now();
  await user.save(); // هنا سيتم تشفير كلمة السر تلقائياً من خلال الـ middleware

  const token = createToken(user._id);
  res.status(200).json({data: user, message: "تم تغيير كلمة المرور بنجاح", token });
});


// Update logged user data
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    data: updatedUser,
  });
});

// Deactivate logged user
exports.deactivateLoggedUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: 'Success' });
});
