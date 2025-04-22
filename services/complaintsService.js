const Complaint = require("../models/reportModels/complaintsModel");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");


exports.createFilterObject = (req, res, next) => {
    const filterObject = {};
    if (req.params.reportId) filterObject.report = req.params.reportId;
    req.filterObject = filterObject;
    next();
  };
  
  exports.createTask = asyncHandler(async (req, res, next) => {
    const newTask = await Task.create(req.body);
    res.status(201).json({ data: newTask });
  });

exports.createComplaint = asyncHandler(async (req, res, next) => {
    const newComplaint = await Complaint.create(req.body);
    res.status(201).json({ data: newComplaint });
});

exports.getAllComplaints = asyncHandler(async (req, res, next) => {
    const complaints = await Complaint.find(req.filterObject);
    res.status(200).json({ data: complaints });
});

exports.getComplaint = asyncHandler(async (req, res, next) => {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
        return next(new ApiError(`No complaint found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: complaint });
});

exports.updateComplaint = asyncHandler(async (req, res, next) => {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!complaint) {
        return next(new ApiError(`No complaint found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: complaint });
});

exports.deleteComplaint = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const complaint = await Complaint.findByIdAndDelete(id);
    if (!complaint) {
        return next(new ApiError(`No complaint found with id: ${req.params.id}`, 404));
    }
    res.status(204).send();
});