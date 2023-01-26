const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    ruolo: {
        type: String,
        default: 'autenticato'
    },
    promossoDa: {
        type: mongoose.Types.ObjectId,
        ref: 'Utenti',
        default: mongoose.Types.ObjectId('000000000000000000000000')
    },
    immagine: {
        type: String,
        default: 'https://animati.app/assets/img/logo512.png'
    }
});

UserSchema.index({email: 1}, {unique: true});
UserSchema.index({promossoDa: 1});

module.exports = UserSchema;