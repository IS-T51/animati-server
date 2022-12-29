const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connect() {
    // Indirizzo del cluster di MongoDB Atlas
    const mongoAtlasUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

    // Provo a connettermi al cluster di MongoDB Atlas
    try {
        mongoose.connect(
            mongoAtlasUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            () => console.log(" Mongoose is connected"),
        );
    } catch (e) {
        console.log("could not connect");
    }

    const dbConnection = mongoose.connection;
    dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
    dbConnection.once("open", () => console.log("Connected to DB!"));
}

function disconnect() {
    mongoose.disconnect();
}

function createCollections() {
    // Crea collezioni
    require('./models/Utente').createCollection();
    require('./models/Attivita').createCollection();
    require('./models/Lista').createCollection();
    require('./models/Etichetta').createCollection();
    require('./models/Valutazione').createCollection();
    require('./models/Segnalazione').createCollection();
}

module.exports = {
    connect,
    disconnect,
    createCollections
};