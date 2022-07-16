const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    _id : String
}, {
    versionKey : false
})
const User = mongoose.model('User', userSchema);
module.exports = User;