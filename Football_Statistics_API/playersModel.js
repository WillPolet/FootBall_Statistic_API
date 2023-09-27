const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
name: String,
nationality: String,
club: String,
overallRating: Number,
age: Number
},
{
    collection: 'Players'
}
);

const Player = mongoose.model('Players', playerSchema);

module.exports = Player;