const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

const Todo = require('../models/todomodels');

exports.getAllTodos = asyncHandler(async (req, res, next) => {

  const todos = await Todo.find({ user: req.user._id});
  res.status(200).json({ data: todos });
});


exports.getTodo = asyncHandler(async (req, res, next) => {  
  const todo = await Todo.findById(req.params.id);  
  if (!todo) {
    return next(new ApiError(`No todo found with id: ${req.params.id}`, 404));
  }
  res.status(200).json({ data: todo });
});  

exports.createTodo = asyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.title);
    const todo = await Todo.create(req.body);
    res.status(201).json({ data: todo });
  });
  
  exports.updateTodo = asyncHandler(async (req, res, next) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return next(new ApiError(`No todo found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: todo });
  });
  
  exports.deleteTodo = asyncHandler(async (req, res, next) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return next(new ApiError(`No todo found with id: ${req.params.id}`, 404));
    }
    res.status(204).json({ data: null });
  });
  
  exports.deleteAllTodos = asyncHandler(async (req, res, next) => {
    await Todo.deleteMany();
    res.status(204).json({ data: null });
  });
  
  exports.getStats = asyncHandler(async (req, res, next) => {
    const stats = await Todo.stats();
    res.status(200).json({ data: stats });
  });  