// initiate express server
const express = require('express');
const app = express();

app.use(express.json());

//pull in schema model
const memory = require("./persist/memory");
const Todo = require("./persist/todo");
const helpers = require("./helper");

//server paths and handlers
app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    Todo.findById(id)
    .then((todo) =>{
        if(todo == null){
            res.status(404).json({Message: "Not Found"});
            return;
        }
        res.json(todo);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

app.get("/todos", (req, res) => {
    Todo.find()
    .then((todoList)=>{
        res.json(todoList);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

app.post("/todos", (req, res) => {
    const newToDo = helpers.setUpToDo(req.body);
    Todo.create(newToDo)
    .then((todo)=>{
        res.json(todo);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

app.put("/todos/:id", (req, res) => {
    const id = req.params.id;
    let newToDo = helpers.setUpToDo(req.body);
    Todo.findByIdAndUpdate(id, newToDo, {new: true})
    .then((todo) =>{
        if(todo == null){
            res.status(404).json({Message: "Not Found"});
            return;
        }
        res.json(todo);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndDelete(id)
    .then((todo) =>{
        if(todo == null){
            res.status(404).json({Message: "Not Found"});
            return;
        }
        res.json(todo);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

app.patch("/todos/:id", (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndUpdate(id, req.body, {new: true})
    .then((todo) =>{
        if(todo == null){
            res.status(404).json({Message: "Not Found"});
            return;
        }
        res.json(todo);
    }).catch((err)=>{
        res.status(500).json(err);
    });
});

module.exports = app;