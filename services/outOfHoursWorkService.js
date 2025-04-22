const OutOfHoursWork = require("../models/reportModels/outOfHoursWorkModel");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

exports.createFilterObject = (req, res, next) => {
    const filterObject = {};
    if (req.params.reportId) filterObject.report = req.params.reportId;
    req.filterObject = filterObject;
    next();
  };
  
 

exports.createOutOfHoursWork = asyncHandler(async (req, res, next) => {
    const newOutOfHoursWork = await OutOfHoursWork.create(req.body);
    res.status(201).json({ data: newOutOfHoursWork });
});

exports.getAllOutOfHoursWork = asyncHandler(async (req, res, next) => {
    const outOfHoursWork = await OutOfHoursWork.find(req.filterObject);
    res.status(200).json({ data: outOfHoursWork });
});

exports.getOutOfHoursWork = asyncHandler(async (req, res, next) => {
    const outOfHoursWork = await OutOfHoursWork.findById(req.params.id);
    if (!outOfHoursWork) {
        return next(new ApiError(`No out of hours work found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: outOfHoursWork });
});

exports.updateOutOfHoursWork = asyncHandler(async (req, res, next) => {
    const outOfHoursWork = await OutOfHoursWork.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!outOfHoursWork) {
        return next(new ApiError(`No out of hours work found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: outOfHoursWork });
});

exports.deleteOutOfHoursWork = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const outOfHoursWork = await OutOfHoursWork.findByIdAndDelete(id);
    if (!outOfHoursWork) {
        return next(new ApiError(`No out of hours work found with id: ${req.params.id}`, 404));
    }
    res.status(204).send();
});