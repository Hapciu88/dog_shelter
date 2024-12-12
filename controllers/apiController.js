const Dog = require('../models/dog');
module.exports = {
    // API Endpoint to list all dogs
    listDogs: async (req, res) => {
        try {
            const dogs = await Dog.findAll(); // Fetch all dogs from the database
            res.status(200).json({
                success: true,
                message: 'List of all dogs',
                data: dogs,
            });
        } catch (err) {
            console.error('Error fetching dogs:', err.message);
            res.status(500).json({
                success: false,
                message: 'An error occurred while fetching dogs.',
            });
        }
    },
};
