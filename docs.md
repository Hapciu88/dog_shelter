# Node.js Express MVC Project Documentation

## Project Overview
This project follows the **Model-View-Controller (MVC)** design pattern, where:
- **Models** represent the data and business logic.
- **Views** handle the UI.
- **Controllers** process incoming requests and return responses.

The application manages sessions using `express-session` with a `Sequelize` database backend and initializes data on startup. It also uses middleware to enforce user authentication.

---

## Session Management

### Dependencies
The following dependencies manage sessions:
- `express-session`: Handles session management.
- `connect-session-sequelize`: Stores sessions in a database using Sequelize.
- `sequelize` and `mysql2`: ORM and database driver for MySQL.

### Configuration
In `index.js`, session management is configured as follows:

1. **Session Store Setup**:
   ```javascript
   const SequelizeStore = require('connect-session-sequelize')(session.Store);
   const sessionStore = new SequelizeStore({ db: sequelize });
   sessionStore.sync({ force: false });
   sessionStore.startExpiringSessions();
   ```

    - Sessions are stored in a database table automatically created by Sequelize.
    - Expired sessions are cleaned up using `startExpiringSessions()`.

2. **Session Middleware**:
   ```javascript
   app.use(
       session({
           secret: 'your_secret_key', // Replace with a secure key
           store: sessionStore,
           resave: false,
           saveUninitialized: false,
           cookie: {
               maxAge: 1000 * 60 * 60 * 24, // 1 day
           },
       })
   );
   ```

   This middleware stores session data in the database and attaches session information to `req`.

---

## Database Initialization

### ORM and Tables
The database is managed using `sequelize`. Tables, including the `Sessions` table, are created automatically using Sequelize's `sync()` method. Models for other entities (e.g., `User`, `Dog`) are defined in the `models` directory.

### Initial Data
The `initializeDatabase` function populates initial data on startup, as defined in `init.js`:
```javascript
// init.js
const { Dog } = require('./models');

module.exports = async function initializeDatabase() {
    await Dog.sync(); // Sync Dog model
    // Populate initial data if necessary
    const dogs = await Dog.findAll();
    if (dogs.length === 0) {
        await Dog.bulkCreate([
            { name: 'Rex', breed: 'German Shepherd', age: 5 },
            { name: 'Bella', breed: 'Labrador Retriever', age: 3 },
        ]);
    }
};
```

---

## Directory Structure

### Models
`models/` contains Sequelize models representing database tables (e.g., `User`, `Dog`):
```javascript
// models/Dog.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dog = sequelize.define('Dog', {
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.INTEGER,
});

module.exports = Dog;
```

### Routes
`routes/` defines request-handling logic:
- `main.js`, `user.js`, `dog.js` for handling specific routes.
- `api.js` for RESTful API endpoints.

Example:
```javascript
// routes/dog.js
const { Dog } = require('../models');

module.exports = (app, appContextData) => {
    app.get('/dogs', async (req, res) => {
        const dogs = await Dog.findAll();
        res.render('dogs', { dogs });
    });
};
```

### Controllers
Controllers organize business logic and interact with models. This logic can be placed in separate files in a `controllers/` directory.

---

## Middleware for Authentication

The app uses middleware to check if a user is logged in:
```javascript
function isLoggedIn(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/signin');
    }
    next();
}
```

This middleware is applied to routes requiring authentication:
```javascript
app.get('/protected', isLoggedIn, (req, res) => {
    res.render('protected');
});
```

---

## Views and Layouts

The app uses `ejs` as the templating engine, with `express-ejs-layouts` for layouts. Views are stored in the `views/` directory:
- `layout.ejs`: Common layout for all pages.
- `dogs.ejs`: Lists dogs retrieved from the database.

---

## How It Loads Users

User-related operations are handled through session data:
- On login, `req.session.userId` is set to the logged-in user's ID.
- Middleware dynamically adds session-based data to `res.locals` for use in views:
   ```javascript
   app.use((req, res, next) => {
       res.locals.appContextData = {
           ...appContextData,
           isLoggedIn: !!req.session.userId,
       };
       next();
   });
   ```

---

## Summary
This project demonstrates a clean implementation of an MVC structure with session management, database initialization, and middleware for authentication. The use of Sequelize simplifies database operations, while `express-session` ensures scalable session management.
