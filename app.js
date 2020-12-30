const express = require("express");
const bodyParser = require("body-parser");
const userController = require(`${__dirname}/controllers/userController`);

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", userController.personalList);

app.get("/work", userController.workList);

app.post("/", userController.createNewItem);

app.listen(3000, () => console.log("Server listening on port 3000"));