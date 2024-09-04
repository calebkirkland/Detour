const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestionController');

router.post('/generate', suggestionController.generateSuggestions);
router.post('/approve', suggestionController.approveSuggestion);
router.post('/deny', suggestionController.denySuggestion);
router.post('/resuggest', suggestionController.resuggestStop);

module.exports = router;
