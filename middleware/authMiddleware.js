module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.session.userId) {
            return next(); // User is authenticated, proceed to the next middleware or route handler
        }
        res.redirect('/user/signin'); // Redirect to login page if not authenticated
    },
};
