const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food"];

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let currentDay = today.toLocaleDateString("en-US", options);

    res.render("list", {currentDay, items});
});

app.post("/", (req, res) => {
    let newListItem = req.body.newItem;
    items.push(newListItem);

    res.redirect("/");
});

app.listen(3000, () => console.log("Server listening on port 3000"));