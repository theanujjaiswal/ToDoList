const mongoose = require('mongoose');

//Defining Schema using this below object
const TodoSchema = new mongoose.Schema({
    newtask : {
        type: String,
        required: true
    },
    category : {
        type : String,
        required:true
    }
});

//for connection
const TaskDo = mongoose.model('task',TodoSchema);
//to export schema
module.exports = TaskDo;