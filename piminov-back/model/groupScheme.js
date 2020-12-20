const mongoose = require("mongoose");
const studentScheme = require('./studentScheme');
const Schema = mongoose.Schema;

const groupScheme = new Schema({
    name: String,
    course: Number,
    type: String,
    students: [studentScheme] | null
},
{
    versionKey: false
}
)

const Group = mongoose.model("Group", groupScheme);

module.exports = Group;