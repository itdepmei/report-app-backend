const Task = require("../models/reportModels/taskModels");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

exports.createTask = asyncHandler(async (req, res, next) => {
    const newTask = await Task.create(req.body);
    res.status(201).json({ data: newTask });
});

exports.getAllTasks = asyncHandler(async (req, res, next) => {
    const tasks = await Task.find();
    res.status(200).json({ data: tasks });
});

exports.getTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return next(new ApiError(`No task found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: task });
});

exports.updateTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next(new ApiError(`No task found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: task });
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
        return next(new ApiError(`No task found with id: ${req.params.id}`, 404));
    }
    res.status(204).send();
});