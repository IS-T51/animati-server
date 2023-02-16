const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.set('strictQuery', true)

function connect(test) {
    return new Promise(async (resolve, reject) => {
        // Indirizzo del cluster di MongoDB Atlas
        const mongoAtlasUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${(test ? 'testing' : process.env.MONGODB_DATABASE)}?retryWrites=true&w=majority`

        // Provo a connettermi al cluster di MongoDB Atlas
        await mongoose.connect(
            mongoAtlasUri,
            { useNewUrlParser: true, useUnifiedTopology: true }
        ).then(
            () => console.log("Mongoose is connected\n")
        ).catch(err => console.log("Could not connect:\n\t" + err));

        const dbConnection = mongoose.connection;
        dbConnection.on("error", (err) => console.log(`Connection error: ${err}`));
        if (!test) {
            dbConnection.on("disconnected", () => console.log(`Disconnected from db`));
        }

        resolve();
        //Note that Mongoose does not necessarily emit an 'error' event if it loses connectivity to MongoDB. You should listen to the disconnected event to report when Mongoose is disconnected from MongoDB.
    });
}

function disconnect() {
    return mongoose.disconnect();
}

function createCollections() {
    // Crea collezioni
    return Promise.all([
    require('../models/Utente').createCollection(),
    require('../models/Attivita').createCollection(),
    require('../models/Lista').createCollection(),
    require('../models/Etichetta').createCollection(),
    require('../models/Valutazione').createCollection(),
    require('../models/Segnalazione').createCollection(),
    ]);
}

module.exports = {
    connect,
    disconnect,
    createCollections
};