const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    const currentDay = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: currentDay, newListItem: items});
});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItem: workItems})
});

app.post("/", (req, res) => {
    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, () => console.log("Server listening on port 3000"));