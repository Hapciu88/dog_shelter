const sequelize = require('../config/database'); // Import Sequelize instance
const Dog = require('../models/dog');
module.exports = {

    // Render the search page
    renderSearch: (req, res, appContextData) => {
        res.render('search', {
            title: 'Search Dogs',
            header: 'Find Your Perfect Companion',
            appName: appContextData.appName
        });
    },

    // Handle search results
    searchResult: async (req, res, appContextData) => {
        const keyword = req.query.keyword || '';
        try {
            const dogs = await Dog.findAll({
                where: {
                    name: sequelize.where(
                        sequelize.fn('LOWER', sequelize.col('name')),
                        'LIKE',
                        `%${keyword.toLowerCase()}%`
                    ),
                },
            });
            res.render('search-result', {
                title: 'Search Results',
                header: `Results for "${keyword}"`,
                dogs,
                keyword,
                appName: appContextData.appName,
            });
        } catch (err) {
            console.error('Error searching for dogs:', err.message);
            res.status(500).send('An error occurred while searching for dogs.');
        }
    },


    // Fetch and list all dogs
    listDogs: async (req, res, appContextData) => {
        try {
            const dogs = await Dog.findAll();
            res.render('list', {
                title: 'Dog List',
                header: 'Our Lovely Dogs',
                dogs,
                appName: appContextData.appName,
            });
        } catch (err) {
            console.error('Error fetching dogs:', err.message);
            res.status(500).send('An error occurred while fetching dogs.');
        }
    },


    adoptDog: async (req, res) => {
        const { id } = req.params;
        try {
            const dog = await Dog.findByPk(id);
            if (!dog) {
                res.status(404).send('Dog not found.');
                return;
            }
            dog.adopted = true;
            await dog.save();
            res.send(`Dog ${dog.name} has been marked as adopted.`);
        } catch (err) {
            console.error('Error adopting dog:', err.message);
            res.status(500).send('An error occurred while marking the dog as adopted.');
        }
    },
};
