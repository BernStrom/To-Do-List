const today = new Date();
const options = {
    weekday: "long",
    day: "numeric",
    month: "long" 
};
    
const currentDay = today.toLocaleDateString("en-US", options);


module.exports = {
    currentDay
};