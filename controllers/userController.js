// 👇 Imported database schema/models/documents and external modules.
const { Item } = require("../models/items");
const { List } = require("../models/list");
const { sampleItems } = require("../models/itemsDoc");
const { currentDay } = require("./currentDay"); 
const _ = require("lodash");

module.exports = {

    personalList: (req, res) => {
        Item.find({ }, (err, items) => { // Search the Item model database for all item documents.
            if (items.length === 0) { // Adds some sample items if there are no exisiting items in the home to-do list.
                Item.insertMany(sampleItems, err => {
                    if (!err) res.redirect("/");
                    // Redirects the the homepage if there are no errors.
                }); 
            } else {
                res.render("list", {listTitle: currentDay, newListItems: items});
                // Renders the home to-do list page with any exisiting items.
            }     
        });
    },

    customList: (req, res) => {
        const listName = _.capitalize(req.params.listName); // Gets the input value of the list name in the URL.

        // Search the List model database for a to-do list document that matches the user input list name in the URL.
        List.findOne({ name: listName }, (err, listDoc) => {

            if (!err) { // If there's no errors and the to-do list name doesn't exist.
                if (!listDoc) {
                    const list = new List({ // This creates a new to-do list document.
                        name: listName,
                        items: sampleItems
                    });
                    
                    // Saves the created to-do list into the database and redirect to the newly-created custom list page.
                    list.save().then(() => res.redirect(`/${listName}`));

                } else { // If the to-do list already exist, simply renders the existing list page.
                    res.render("list", {listTitle: listDoc.name, newListItems: listDoc.items});
                }

            }
        });
    },

    create: (req, res) => {
        const itemName = req.body.newItem; // Gets the input value of the item name from the to-do form.
        const listName = req.body.list; // Gets the submit button name from the to-do form.

        const item = new Item({ // This creates a new to-do item.
            name: itemName
        });

        if (listName === currentDay) { // If the list name is the homepage to-do list title.
            // Save the new item to the list and redirect back to the homepage.
            item.save().then(() => res.redirect("/"));
        } else {
            List.findOne({ name: listName }, (err, listDoc) => {
                listDoc.items.push(item); // Inserts the newly-created item into the custom to-do list.
                listDoc.save().then(() => res.redirect(`/${listName}`)); 
            }); // Saves the created to-do item into the database and redirect to the custom to-do list page.
        }
    },

    delete: (req, res) => {
        const checkedItemId = req.body.checkbox; // Gets the to-do item id that the user checked from the database 
        const listName = req.body.listName; // Gets the current to-do list name from the delete form.

        if (listName === currentDay) {
            Item.findByIdAndDelete(checkedItemId, (err) => { // Looks inside the Item database model for the item id and delete it.
                if (!err) res.redirect("/");
            });
        } else { 
            // Looks inside the List database model for the matching list name and removes the matching item id value from its items array.
            List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, (err, listDoc) => {
                if (!err) res.redirect(`/${listName}`);
            });
        }
    }

};
