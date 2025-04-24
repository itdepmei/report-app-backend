const express = require("express");
const {setReportIdToBody} = require("../middlewares/setReportIdToBody");

const {
  getAllSuggestions,
  getSuggestion,
  createSuggestion,
  updateSuggestion,
  deleteSuggestion,
  createFilterObject,
} = require("../services/suggestionsService");

const {
  getSuggestionValidator,
  createSuggestionValidator,
  updateSuggestionValidator,
  deleteSuggestionValidator,
} = require("../utils/validators/suggestionsValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObject, getAllSuggestions)
  .post(setReportIdToBody, createSuggestionValidator, createSuggestion);

router
  .route("/:id")
  .get(getSuggestionValidator, getSuggestion)
  .put(updateSuggestionValidator, updateSuggestion)
  .delete(deleteSuggestionValidator, deleteSuggestion);

module.exports = router;
