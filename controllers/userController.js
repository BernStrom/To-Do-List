const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

module.exports = {
    personalList: (req, res) => {
        const today = new Date();
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long"
        };
    
        const currentDay = today.toLocaleDateString("en-US", options);
        res.render("list", {listTitle: currentDay, newListItem: items});
    },

    workList: (req, res) => {
        res.render("list", {listTitle: "Work List", newListItem: workItems});
    },

    createNewItem: (req, res) => {
        const item = req.body.newItem;
    
        if (req.body.list === "Work") {
            workItems.push(item);
            res.redirect("/work");
        } else {
            items.push(item);
            res.redirect("/");
        }
    }
};
