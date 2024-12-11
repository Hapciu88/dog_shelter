const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController'); // Import the API controller

// Define API route for listing dogs
router.get('/v1/dog/list', apiController.listDogs);

module.exports = router;
