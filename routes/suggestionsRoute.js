const express = require("express");
const {
    getAllSuggestions,
    getSuggestion,
    createSuggestion,
    updateSuggestion,
    deleteSuggestion,
} = require("../services/suggestionsService");

const {
    getSuggestionValidator,
    createSuggestionValidator,
    updateSuggestionValidator,
    deleteSuggestionValidator,
} = require("../utils/validators/suggestionsValidator");


const router = express.Router();

router.route("/").get(getAllSuggestions).post(createSuggestionValidator, createSuggestion);

router
  .route("/:id")    
  .get(getSuggestionValidator, getSuggestion)
  .put(updateSuggestionValidator, updateSuggestion)
  .delete(deleteSuggestionValidator, deleteSuggestion);

module.exports = router;