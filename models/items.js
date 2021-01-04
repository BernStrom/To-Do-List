// TO-DO list items database schema and model.

const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemsSchema = new Schema({
    name: {
        type: String, 
        required: [true, "AN ITEM NAME IS REQUIRED!"]
    }
});

const Item = mongoose.model("Item", itemsSchema);

// Exported Item schema and model.
module.exports = {
    Item,
    itemsSchema
};