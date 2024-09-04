const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

router.post('/calculate', routeController.calculateRoute);
router.post('/export', routeController.exportRoute);

module.exports = router;
