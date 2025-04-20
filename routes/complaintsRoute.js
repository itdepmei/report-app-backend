const express = require("express");

const {
  getAllComplaints,
  getComplaint,
  createComplaint,
  updateComplaint,
  deleteComplaint,
} = require("../services/complaintsService");

const {
  getComplaintValidator,
  createComplaintValidator,
  updateComplaintValidator,
  deleteComplaintValidator,
} = require("../utils/validators/complaintsValidator");

const router = express.Router();

router.route("/").get(getAllComplaints).post(createComplaintValidator, createComplaint);

router
  .route("/:id")
  .get(getComplaintValidator,getComplaint)
  .put(updateComplaintValidator, updateComplaint)
  .delete(deleteComplaintValidator, deleteComplaint);

module.exports = router;
