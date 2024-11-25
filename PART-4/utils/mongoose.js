const mongoose = require('mongoose');

const connectToDatabase = (mongoUrl) => {
  mongoose.connect(mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));
};

module.exports = connectToDatabase;
