const mongoose = require('mongoose');

module.exports= UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ruolo: {
        type: String,
        required: true
    }
});
