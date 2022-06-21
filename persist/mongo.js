const mongoose = require('mongoose');
const db = mongoose.connection;


function connect(user, password){
    const connectionString = `mongodb+srv://` + user + `:` + password + `@cluster0.ohorb.mongodb.net/?retryWrites=true&w=majority`;
    mongoose.connect(connectionString, {
        useNewURlParser: true,
        useUnifiedTopology: true,
    });
}
function onConnect (callback) {
    db.once("connecting", () => {
        console.log("Connecting to MongoDB");
    });
    db.once("connected", () => {
        console.log("Connected to MongoDB");
    });
    db.once("open", () => {
        console.log("Open connection to MongoDB");
        callback();
    });
    db.once("error", () => {
        console.log("Error connecting to MongoDB");
    });
}

module.exports = {
    connect: connect,
    onConnect: onConnect,
};