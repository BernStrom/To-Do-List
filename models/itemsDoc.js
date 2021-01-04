// Items document based on the Item database model.

const { Item } = require("./items");

const sampleItem = new Item({
    name: "Add your To-Do items below 👇"
});

const dailyItems = [sampleItem];

// Exported items document.
module.exports = {
    dailyItems
};