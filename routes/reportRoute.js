const express = require("express");

const complaintsRoute = require("./complaintsRoute");
const suggestionsRoute = require("./suggestionsRoute");
const taskRoute = require("./taskRoute");
const obstaclesRoute = require("./obstaclesRoute");
const outOfHoursWorkRoute = require("./outOfHoursWorkRoute");

const {
  getAllReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
  setUserIdToReport,
  sendReportToAssistant,
  getAllReportsForAssistant,
} = require("../services/reportService");

const {
  getReportValidator,
  createReportValidator,
  updateReportValidator,
  deleteReportValidator,
} = require("../utils/validators/reportValidator");

const authService = require("../services/authService");

const router = express.Router();

// Nested routes (for related models)
router.use("/:reportId/tasks", taskRoute);
router.use("/:reportId/suggestions", suggestionsRoute);
router.use("/:reportId/complaints", complaintsRoute);
router.use("/:reportId/obstacles", obstaclesRoute);
router.use("/:reportId/outOfHoursWork", outOfHoursWorkRoute);

// Routes

// Get all reports or create a report
router
  .route("/")
  .get(authService.protect, getAllReports)
  .post(
    authService.protect,
    setUserIdToReport,
    createReportValidator,
    createReport
  );


// Get all reports sent to assistant
router
  .route("/sendToAssistant")
  .get(authService.protect, getAllReportsForAssistant);

// Send a specific report to assistant
router
  .route("/:id/sendToAssistant")
  .put(authService.protect, sendReportToAssistant);

// Get, Update, Delete a specific report
router
  .route("/:id")
  .get(getReportValidator, getReport)
  .put(updateReportValidator, updateReport)
  .delete(authService.protect, deleteReportValidator, deleteReport);

module.exports = router;
