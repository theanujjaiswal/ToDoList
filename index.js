const express = require('express');

const port = 8000;
const app = express();
const path = require('path');


const db = require('./config/mongoose');
const TaskDo = require('./model/task');
app.set('view engine','ejs'); //for setting view engine
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var tasks = [];

app.get('/',function(req,res){
    
    TaskDo.find({}, function(err, task){
        if(err){
            console.log("error in fetching List from db");
            return;
        }
        return res.render('home',{
            title: "To Do List",
            task_list: task
        });

    });


});

//for posting data on server like login 
app.post('/add-task',function(req,res){
    
    TaskDo.create({
        newtask : req.body.newtask,
        category : req.body.category
    },function(err,newTask){
        if(err){
            console.log('error generated while making a connection');
            return;
        }
        console.log('##',newTask);
        return res.redirect('back');
    });
    
});

app.get('/delete-task/',function(req,res){
    //get the id from the query parameter
    console.log(req.query);
    let id = req.query.id;
    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        console.log('error in deleting an object from database');
        return;
    });
    return res.redirect('back');
});

app.listen(port,function(err){
    if(err){
        console.log(`Error in connection ${err}`);
        return;
    }
    console.log(`connected successfully on port ${port}`);
});
