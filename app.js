// Core node dependencies and imported modules for the server.
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userController = require(`${__dirname}/controllers/userController`);

const app = express();
const adminAccess = process.env.MONGO_DB_ACCESS;

// Connection to MongoDB Atlas database cluster using Mongoose.
mongoose.connect(`mongodb+srv://admin-bern:${adminAccess}@cluster0.c5v85.mongodb.net/todolistDB`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
});

app.set("view engine", "ejs"); // Settings to read EJS files in views directory.

app.use(express.static("public")); // Serve static files such as styles & images from the public directory.
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", userController.personalList); // GET and display the homepage when the URL points to the root path.
app.get("/:listName", userController.customList); // GET and display a new or existing TO-DO list page with a custom title.

app.post("/", userController.create); // CREATE a new item when the item form is submitted.
app.post("/delete", userController.delete); // DELETE an exisitng item in the current TO-DO list.

// Server will run on a dynamically assigned port number by Heroku OR run on port number 3000 locally.
app.listen(process.env.PORT || 3000);