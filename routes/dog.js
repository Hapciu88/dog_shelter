const express = require('express');
const router = express.Router();

const dogShelterController = require('../controllers/dogShelterController'); // Adjust the path as needed

module.exports = (app, appContextData) => {
    router.get('/search', (req, res) => dogShelterController.renderSearch(req, res, appContextData));
    router.get('/search-result', dogShelterController.searchResult);
    router.get('/list', dogShelterController.listDogs);
    app.use('/', router);
};
