const express = require("express");
const {setReportIdToBody} = require("../middlewares/setReportIdToBody");

const {
  getAllOutOfHoursWork,
  getOutOfHoursWork,
  createOutOfHoursWork,
  updateOutOfHoursWork,
  deleteOutOfHoursWork,
  createFilterObject,
} = require("../services/outOfHoursWorkService");

const {
  getOutOfHoursWorkValidator,
  createOutOfHoursWorkValidator,
  updateOutOfHoursWorkValidator,
  deleteOutOfHoursWorkValidator,
} = require("../utils/validators/outOfHoursWorkValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObject, getAllOutOfHoursWork)
  .post(setReportIdToBody, createOutOfHoursWorkValidator, createOutOfHoursWork);

router
  .route("/:id")
  .get(getOutOfHoursWorkValidator, getOutOfHoursWork)
  .put(updateOutOfHoursWorkValidator, updateOutOfHoursWork)
  .delete(deleteOutOfHoursWorkValidator, deleteOutOfHoursWork);

module.exports = router;
