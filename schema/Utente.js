const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    ruolo: {
        type: String,
        required: true
    },
    promossoDa: {
        type: mongoose.ObjectId,
        ref: 'Utenti',
    },
    immagine: {
        type: String
    }
});

UserSchema.index({email: 1}, {unique: true});

module.exports = UserSchema;