const express = require("express");
const {setReportIdToBody} = require("../middlewares/setReportIdToBody");

const {
  getAllComplaints,
  getComplaint,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  createFilterObject,
} = require("../services/complaintsService");

const {
  getComplaintValidator,
  createComplaintValidator,
  updateComplaintValidator,
  deleteComplaintValidator,
} = require("../utils/validators/complaintsValidator");

const router = express.Router({mergeParams: true});


router.route("/").get(createFilterObject, getAllComplaints).post(setReportIdToBody, createComplaintValidator, createComplaint);

router
  .route("/:id")
  .get(getComplaintValidator,getComplaint)
  .put(updateComplaintValidator, updateComplaint)
  .delete(deleteComplaintValidator, deleteComplaint);

module.exports = router;
