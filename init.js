const sequelize = require('./config/database'); // Import the Sequelize instance
const Dog = require('./models/Dog'); // if init.js is in dog_shelter/
// Function to sync database and seed data
async function initializeDatabase() {
    try {
        // Sync database
        await sequelize.sync();

        // Check if there are any dogs in the database
        const dogCount = await Dog.count();
        if (dogCount === 0) {
            // Seed the database with 10 dogs
            await Dog.bulkCreate([
                { name: 'Buddy', breed: 'Golden Retriever', age: 3, description: 'Loves to play fetch and is very friendly.', adopted: false },
                { name: 'Bella', breed: 'Labrador Retriever', age: 5, description: 'A calm and affectionate companion.', adopted: true },
                { name: 'Charlie', breed: 'Beagle', age: 2, description: 'Energetic and curious, loves to explore.', adopted: false },
                { name: 'Lucy', breed: 'Poodle', age: 4, description: 'Intelligent and loves attention.', adopted: true },
                { name: 'Max', breed: 'German Shepherd', age: 6, description: 'Loyal and protective, great with kids.', adopted: false },
                { name: 'Daisy', breed: 'Bulldog', age: 3, description: 'Loves naps and cuddles.', adopted: false },
                { name: 'Rocky', breed: 'Boxer', age: 7, description: 'Playful and full of energy.', adopted: true },
                { name: 'Molly', breed: 'Shih Tzu', age: 1, description: 'Small, fluffy, and very playful.', adopted: false },
                { name: 'Jack', breed: 'Cocker Spaniel', age: 4, description: 'Gentle and friendly, loves walks.', adopted: false },
                { name: 'Sophie', breed: 'Border Collie', age: 3, description: 'Highly intelligent and active.', adopted: true }
            ]);
            console.log('Database seeded with 10 dogs.');
        } else {
            console.log('Database already contains dog data.');
        }
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1); // Exit with error
    }
}

module.exports = initializeDatabase;
