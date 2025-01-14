const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController'); // Correct path

// Route to get the report
router.get('/', reportController.getReport);

module.exports = router;
