const Report = require("../models/reportModels/reportModels");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

exports.setUserIdToReport = (req, res, next) => {
    if(!req.body.user) req.body.user = req.user._id
    next();
  };

exports.createReport = asyncHandler(async (req, res, next) => {
    const newReport = await Report.create(req.body);
    res.status(201).json({ data: newReport });
});

exports.getAllReports = asyncHandler(async (req, res, next) => {
    const reports = await Report.find({ user: req.user._id });
    res.status(200).json({ data: reports });
});

exports.getReport = asyncHandler(async (req, res, next) => {
    
    const report = await Report.findById(req.params.id);
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
    if (!report) {
        return next(new ApiError(`No report found with id: ${req.params.id}`, 404));
    }
    res.status(204).send();
});



exports.sendReportToAssistant = asyncHandler(async (req, res, next) => {
    const report = await Report.findOne({ _id: req.params.id, user: req.user._id });
    if (!report) {
        return next(new ApiError(`No report found with id: ${req.params.id}`, 404));
    }
    report.sendToAssistant = true;
    await report.save();
    res.status(200).json({ data: report });
});

exports.getAllReportsForAssistant = asyncHandler(async (req, res, next) => {
    const reports = await Report.find({ sendToAssistant: true }).populate('user', 'name');
    res.status(200).json({ data: reports });
});
