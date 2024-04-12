// QUESTION 1. Import mongoose
const mongoose = require('mongoose');

// QUESTION 2. Paste your connection string from MongoDB Atlas here, with the correct username and password.
//
// Don't forget the quotation marks, and do not include the triangle brackets <> around your password.
// It should look something like this: "mongodb+srv://ddoski:my_password@cluster#.xxxxxxx.mongodb.net/"
//
// Note: See connectToDB() below, which uses this variable and calls mongoose.connect(...)
const dbConnectionUri = 'mongodb+srv://andrealukas24:yahSEKI00@cluster0.upjp0bk.mongodb.net/';
const dbName = "coffee";

// QUESTION 3. Create a new mongoose.Schema with two String properties: "front" and "back".
const coffeeSchema = new mongoose.Schema({
    name: String,
    espresso: String,
    milk: String,
    foMilk: String,
    iceOrHot: String,
    sugarLv: String,
    caffineLv: String,
    size: Number,
    crashLv: String
});


// QUESTION 4. Create a mongoose.model with the schema you just created.
// Note: The first parameter should match the model name (capitalized, not plural, i.e. "Flashcard"),
//       as mongoose automatically converts it to a plural collection name (i.e. "Flashcard" -> "flashcards")
const Coffee = mongoose.model('Coffee', coffeeSchema);

// Connects to database with the connection string and database name specified above
async function connectToDB() {
    await mongoose.connect(dbConnectionUri, { dbName });
    console.log("Successfully connected to MongoDB");
}

// Exports the connect function and the Flashcard model to use in `server.js`
module.exports = { connectToDB, Coffee };
