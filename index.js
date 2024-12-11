const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Import Sequelize session store
const sequelize = require('./config/database'); // Your Sequelize instance
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
const initializeDatabase = require('./init'); // Import the initialization logic

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure session middleware
const sessionStore = new SequelizeStore({
    db: sequelize,
});

// Use express-ejs-layouts
app.use(ejsLayouts);
app.set('layout', 'layout'); // Sets the default layout file to views/layout.ejs



app.use(
    session({
        secret: 'your_secret_key',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

// Sync session store with the database
sessionStore.sync({ force: false }); // Create the Sessions table if it doesn’t exist
sessionStore.startExpiringSessions(); // Enable automatic cleanup of expired sessions

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const appContextData = { appName: "Dog Shelter Adrian" };

app.use((req, res, next) => {
    res.locals.appContextData = {
        ...appContextData,
        isLoggedIn: !!req.session.userId, // Dynamically check if the user is logged in
    };
    next();
});

// Import and use routes
require('./routes/main')(app, appContextData);
require('./routes/user')(app, appContextData);
require('./routes/dog')(app, appContextData);
// Load API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);
// Initialize database and start the server
initializeDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Failed to start the server:', err);
    });
// Sync main database (optional if already synced)
sequelize.sync();
