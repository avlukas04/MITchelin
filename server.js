const express = require("express");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB, Coffee } = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serves our frontend files from the 'public' directory (GET /, /script.js, /styles.css, etc.)
// https://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + "/public"));


// QUESTION 5. Finish this route handler that creates a new card, with "front" and "back" from the POST request body.
// Hint: Create a new Flashcard and save it to the database. Make sure to await asynchronous functions!
// post info about coffee
app.post("/new-coffee", asyncHandler(async (req, res) => {
    const { name, espresso, milk, foMilk, iceOrHot, sugarLv, caffineLv, size, crashLv } = req.body;
    const newCoffee = new Coffee({ name, espresso, milk, foMilk, iceOrHot, sugarLv, caffineLv, size, crashLv });
    await newCoffee.save(); // Ensure this operation is awaited
    // newCoffee.save(); // Ensure this operation is awaited
    res.status(201).json(newCoffee);
}));


// gets all coffee
app.get("/coffees", asyncHandler(async (req, res) => {
    const coffees = await Coffee.find();
    res.json(coffees);
}));


// gets 1 coffee based on crash level
app.get("/coffee/:id", asyncHandler(async (req, res) => {
    const id = req.params.id;
    const coffee = await Coffee.findById(id);
    if (!coffee) {
        return res.status(404).json({ error: "Coffee Not Found" });
    }
    res.json(coffee);
}));


// QUESTION 8. Write a route handler for "GET /delete/:id" to delete a card by its id and return the deleted data.
// Try googling what the mongoose method could be or check the lab slides!
// Hint: This will be similar to the previous question.
app.get("/delete/:id", asyncHandler(async (req, res) => {
    const id = req.params.id; 
    const coffee = await Coffee.findByIdAndDelete(id); 
    if (!coffee) {
        return res.status(404).json({ error: "Coffee Not Found" }); // Set status to 404 if not found
    }
    res.json(coffee);
}));

app.get("/random-coffee", asyncHandler(async (req, res) => {
    const randomCoffee = await Coffee.aggregate([
        { $sample: { size: 1 } }
    ]);
    if (randomCoffee.length > 0) {
        res.json(randomCoffee[0]);
    } else {
        res.status(404).send("No coffee found.");
    }
}));


// connects to the database and starts the server
async function start() {
    await connectToDB();

    return app.listen(3003, () => {
        console.log("Listening on port 3003");
    });
}

// fancy way of saying only run the start function if we run this script from the CLI with `node server.js`.
// alternative, this file could imported with require("server.js"), where this will not run (i.e. on our autograder)
if (require.main === module) {
    start().catch((err) => console.error(err));
}
