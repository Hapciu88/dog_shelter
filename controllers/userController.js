const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
    // Render the registration form
    renderRegister: (req, res, appContextData) => {
        res.render('register', {
            title: 'Register',
            header: 'Create Your Account',
            appName: appContextData.appName
        });
    },

    // Handle user registration
    register: async (req, res, appContextData) => {
        const { firstName, lastName, username, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ firstName, lastName, username, email, password: hashedPassword });
            res.redirect('/user/signin');
        } catch (error) {
            console.error('Error registering user:', error.message);
            res.status(500).render('register', {
                title: 'Register',
                header: 'Create Your Account',
                appName: appContextData.appName,
                error: 'An error occurred while registering.',
            });
        }
    },

    // Render the login form
    renderSignin: (req, res, appContextData) => {
        res.render('login', {
            title: 'Sign In',
            header: 'Welcome Back!',
            appName: appContextData.appName
        });
    },

    // Handle user login
    signin: async (req, res, appContextData) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                res.status(401).render('login', {
                    title: 'Sign In',
                    header: 'Welcome Back!',
                    appName: appContextData.appName,
                    error: 'Invalid email or password.',
                });
                return;
            }
            req.session.userId = user.id; // Persist user ID in session
            res.redirect('/user/profile');
        } catch (error) {
            console.error('Error signing in:', error.message);
            res.status(500).render('login', {
                title: 'Sign In',
                header: 'Welcome Back!',
                appName: appContextData.appName,
                error: 'An error occurred while signing in.',
            });
        }
    },


    // Render the user profile
    renderProfile: async (req, res, appContextData) => {
        if (!req.session.userId) {
            res.redirect('/user/signin');
            return;
        }
        try {
            const user = await User.findByPk(req.session.userId);
            res.render('profile', {
                title: 'Your Profile',
                header: `Welcome, ${user.firstName}!`,
                appName: appContextData.appName,
                user
            });
        } catch (error) {
            console.error('Error fetching profile:', error.message);
            res.status(500).send('An error occurred while fetching the profile.');
        }
    },


    // Handle user logout
    logout: (req, res, appContextData) => {
        req.session.destroy(() => {
            res.redirect('/user/signin');
        });
    },
};
