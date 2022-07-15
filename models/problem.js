const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
        _id: String,
        likes: Number,
        dislikes: Number
});

problemSchema.methods.increaseValue = async function(value) {
    if (value === 'L') {
        this.likes = this.likes + 1;
    }
    else {
        this.dislikes = this.dislikes + 1;
    }
}
problemSchema.methods.decreaseValue = async function(value) {
    if (value === 'L') {
        this.likes = this.likes - 1;
    }
    else {
        this.dislikes = this.dislikes - 1;
    }
}

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
