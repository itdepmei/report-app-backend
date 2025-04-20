const express = require("express");

const {
    getAllOutOfHoursWork,
    getOutOfHoursWork,
    createOutOfHoursWork,
    updateOutOfHoursWork,
    deleteOutOfHoursWork,
} = require("../services/outOfHoursWorkService");

const {
    getOutOfHoursWorkValidator,
    createOutOfHoursWorkValidator,
    updateOutOfHoursWorkValidator,
    deleteOutOfHoursWorkValidator,
} = require("../utils/validators/outOfHoursWorkValidator");


const router = express.Router();

router.route("/").get(getAllOutOfHoursWork).post(createOutOfHoursWorkValidator, createOutOfHoursWork);

router
  .route("/:id")
  .get(getOutOfHoursWorkValidator,getOutOfHoursWork)
  .put(updateOutOfHoursWorkValidator, updateOutOfHoursWork)
  .delete(deleteOutOfHoursWorkValidator, deleteOutOfHoursWork);

module.exports = router;