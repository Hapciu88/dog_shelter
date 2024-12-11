const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/authMiddleware'); // Import middleware

module.exports = (app, appContextData) => {
    // Public routes (no authentication required)
    router.get('/register', (req, res) => userController.renderRegister(req, res, appContextData));
    router.post('/register', (req, res) => userController.register(req, res, appContextData));
    router.get('/signin', (req, res) => userController.renderSignin(req, res, appContextData));
    router.post('/signin', (req, res) => userController.signin(req, res, appContextData));

    // Protected routes (authentication required)
    router.get('/profile', ensureAuthenticated, (req, res) =>
        userController.renderProfile(req, res, appContextData)
    );
    router.get('/logout', ensureAuthenticated, (req, res) =>
        userController.logout(req, res, appContextData)
    );

    app.use('/user', router);
};
