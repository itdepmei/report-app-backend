const express = require("express");
const {setReportIdToBody} = require("../middlewares/setReportIdToBody");

const {
  getAllObstacles,
  getObstacles,
  createObstacle,
  updateObstacle,
  deleteObstacle,
  createFilterObject
} = require("../services/obstaclesService");

const {
  getObstacleValidator,
  createObstacleValidator,
  updateObstacleValidator,
  deleteObstacleValidator,
} = require("../utils/validators/obstaclesValidator");

const router = express.Router({mergeParams: true});

router.route("/").get(createFilterObject, getAllObstacles).post(setReportIdToBody, createObstacleValidator, createObstacle);

router
  .route("/:id")
  .get(getObstacleValidator, getObstacles)
  .put(updateObstacleValidator, updateObstacle)
  .delete(deleteObstacleValidator, deleteObstacle);

module.exports = router;
