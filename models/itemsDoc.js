// Items document based on the Item database model.

const { Item } = require("./items");

const sampleItem1 = new Item({
    name: "Welcome to your To-Do list! ✅"
});

const sampleItem2 = new Item({
    name: "Add your To-Do items below 👇"
});

const sampleItems = [sampleItem1, sampleItem2];

// Exported items document.
module.exports = {
    sampleItems
};