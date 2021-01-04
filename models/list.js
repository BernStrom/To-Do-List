// TO-DO "Lists" database schema and model.

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { itemsSchema } = require(`../models/items`);

const listSchema = new Schema({
    name: {
        type: String,
        required: [true, "A LIST NAME IS REQUIRED!"]
    },
    items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);

// Exported List model.
module.exports = {
    List
};