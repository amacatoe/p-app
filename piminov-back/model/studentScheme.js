const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentScheme = new Schema({
    fio: String,
    age: Number,
    type: String,
    avgPoint: Number,
    debt: Number
},
{
    versionKey: false
}
)

const Student = mongoose.model("Student", studentScheme);

module.exports = Student;