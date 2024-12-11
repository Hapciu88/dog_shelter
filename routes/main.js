const express = require('express');
const router = express.Router();

const dogShelterController = require('../controllers/dogShelterController'); // Adjust the path as needed

const mainController = require('../controllers/mainController'); // Adjust the path as needed

module.exports = (app, appContextData) => {
    router.get('/', (req, res) => mainController.renderIndex(req, res, appContextData));
    router.get('/about', (req, res) => mainController.renderAbout(req, res, appContextData));
    app.use('/', router);
};
