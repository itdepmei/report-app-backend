const Obstacles = require("../models/reportModels/obstaclesModel");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

exports.createObstacle = asyncHandler(async (req, res, next) => {
    const newObstacles = await Obstacles.create(req.body);    
    res.status(201).json({ data: newObstacles });
});

exports.getAllObstacles = asyncHandler(async (req, res, next) => {
    const obstacles = await Obstacles.find();
    res.status(200).json({ data: obstacles });
});

exports.getObstacles = asyncHandler(async (req, res, next) => {
    const obstacles = await Obstacles.findById(req.params.id);
    if (!obstacles) {
        return next(new ApiError(`No obstacles found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: obstacles });
});

exports.updateObstacle = asyncHandler(async (req, res, next) => {
    const obstacles = await Obstacles.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!obstacles) {
        return next(new ApiError(`No obstacles found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: obstacles });
});

exports.deleteObstacle = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const obstacles = await Obstacles.findByIdAndDelete(id);
    if (!obstacles) {
        return next(new ApiError(`No obstacles found with id: ${req.params.id}`, 404));
    }
    res.status(204).send();
});