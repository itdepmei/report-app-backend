const Report = require("../models/reportModels/reportModels");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const createLog = require("../utils/createLog");

exports.setUserIdToReport = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.createReport = asyncHandler(async (req, res, next) => {
  const newReport = await Report.create(req.body);
  await createLog(req.user.name, `قام المستخدم ${req.user.name} بأضافة تقرير جديد`, "اضافة" )
  res.status(201).json({ data: newReport });
});

exports.getAllReports = asyncHandler(async (req, res, next) => {
  const filter = { user: req.user._id };

  if (req.query.date) {
    const inputDate = new Date(req.query.date);
    const nextDay = new Date(inputDate);
    nextDay.setDate(inputDate.getDate() + 1);

    filter.date = {
      $gte: inputDate,
      $lt: nextDay,
    };
  }

  const reports = await Report.find(filter).populate("user", "name");
  res.status(200).json({ data: reports });
});

exports.getReport = asyncHandler(async (req, res, next) => {
  const report = await Report.findById(req.params.id).populate("user", "name");
  if (!report) {
    return next(new ApiError(`No report found with id: ${req.params.id}`, 404));
  }
  res.status(200).json({ data: report });
});

exports.updateReport = asyncHandler(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!report) {
    return next(new ApiError(`No report found with id: ${req.params.id}`, 404));
  }
  res.status(200).json({ data: report });
});

exports.deleteReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await Report.findByIdAndDelete(id);
    await createLog(req.user.name, `قام المستخدم ${req.user.name} بحذف تقرير`, "حذف")

  if (!report) {
    return next(new ApiError(`No report found with id: ${req.params.id}`, 404));
  }

  res.status(204).send();
});

exports.sendReportToAssistant = asyncHandler(async (req, res, next) => {
  const report = await Report.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!report) {
    return next(new ApiError(`No report found with id: ${req.params.id}`, 404));
  }
  report.sendToAssistant = true;
  await report.save();
  await createLog(req.user.name, `قام المستخدم ${req.user.name} بارسال تقرير `, "تعديل")

  res.status(200).json({ data: report });
});

exports.getAllReportsForAssistant = asyncHandler(async (req, res, next) => {
  const filter = { sendToAssistant: true };

  // فلترة حسب التاريخ فقط إذا تم إرساله
  if (req.query.date) {
    const inputDate = new Date(req.query.date);
    inputDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(inputDate);
    nextDay.setDate(inputDate.getDate() + 1);

    filter.date = {
      $gte: inputDate,
      $lt: nextDay,
    };
  }

  // فلترة القسم إذا لم تكن القيمة "الكل"
  if (req.query.department && req.query.department !== "الكل") {
    filter.department = {
      $regex: new RegExp(`^${req.query.department}$`, "i"),
    };
  }

  const reports = await Report.find(filter)
    .populate("user", "name")
    .populate("tasks")
    .populate("complaints")
    .populate("Obstacles")
    .populate("suggestions")
    .populate("outOfHoursWork")
    .lean({ virtuals: true });;

  res.status(200).json({ data: reports });
});


