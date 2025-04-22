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
} = require("../services/reportService");

const {
    getReportValidator,
    createReportValidator,
    updateReportValidator,
    deleteReportValidator,
} = require("../utils/validators/reportValidator");


const router = express.Router();

router.use("/:reportId/tasks", taskRoute);
router.use("/:reportId/suggestions", suggestionsRoute);
router.use("/:reportId/complaints", complaintsRoute);
router.use("/:reportId/obstacles", obstaclesRoute);
router.use("/:reportId/outOfHoursWork", outOfHoursWorkRoute);


router.route("/").get(getAllReports).post(createReportValidator, createReport);

router
  .route("/:id")
  .get(getReportValidator, getReport)
  .put(updateReportValidator, updateReport)
  .delete(deleteReportValidator, deleteReport);

module.exports = router;