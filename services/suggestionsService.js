const Suggestion = require("../models/reportModels/suggestionsModels");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");


exports.createFilterObject = (req, res, next) => {
  const filterObject = {};
  if (req.params.reportId) filterObject.report = req.params.reportId;
  req.filterObject = filterObject;
  next();
};


exports.createSuggestion = asyncHandler(async (req, res, next) => {
    const newSuggestion = await Suggestion.create(req.body);
    res.status(201).json({ data: newSuggestion });
});

exports.getAllSuggestions = asyncHandler(async (req, res, next) => {
    const suggestions = await Suggestion.find(req.filterObject);

    res.status(200).json({ data: suggestions });
});

exports.getSuggestion = asyncHandler(async (req, res, next) => {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
        return next(new ApiError(`No suggestion found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: suggestion });
});

exports.updateSuggestion = asyncHandler(async (req, res, next) => {
    const suggestion = await Suggestion.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!suggestion) {
        return next(new ApiError(`No suggestion found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: suggestion });
});

exports.deleteSuggestion = asyncHandler(async (req, res, next) => {
    const suggestion = await Suggestion.findByIdAndDelete(req.params.id);
    if (!suggestion) {
        return next(new ApiError(`No suggestion found with id: ${req.params.id}`, 404));
    }
    res.status(204).send();
});