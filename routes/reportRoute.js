const express = require("express");
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

router.route("/").get(getAllReports).post(createReportValidator, createReport);

router
  .route("/:id")
  .get(getReportValidator, getReport)
  .put(updateReportValidator, updateReport)
  .delete(deleteReportValidator, deleteReport);

module.exports = router;