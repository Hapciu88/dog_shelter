
module.exports = {
    // Render the homepage
    renderIndex: (req, res, appContextData) => {
        res.render('index', {
            title: 'Home',
            header: 'Welcome to Dog Shelter',
            appName: appContextData.appName
        });
    },

    // Render the "About Us" page
    renderAbout: (req, res, appContextData) => {
        res.render('about', {
            title: 'About Us',
            header: 'Learn More About Dog Shelter',
            appName: appContextData.appName
        });
    },

}