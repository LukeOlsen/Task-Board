const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    userName: {type: String},
    userId: {type: Number}
})

module.exports = mongoose.model('User', User);