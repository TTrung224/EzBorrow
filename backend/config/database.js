const mongoose = require('mongoose');
const { MONGO_URI } = process.env 
exports.connect = () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to ' + MONGO_URI);
    }).catch((error) => {
        console.error('Error connecting to ' + MONGO_URI);
        console.error(error);
        process.exit(1);
    })
}