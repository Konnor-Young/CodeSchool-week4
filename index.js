// initiate express server
const express = require('express');
const app = express();

app.use(express.json());

//pull in db
const persist = require("./persist");

//initiate command line flags
const flags = require('flags');
flags.defineNumber("port", 3000, "Ports for http server");
flags.parse();

// initiate env variables
const dotenv = require('dotenv');
const { getAllToDo, deleteToDo } = require('./persist');

// set up port # catch-all
const port = flags.get("port") || process.env.PORT || 4000;

//server paths and handlers
app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.getToDo(id);
    res.json(todo);
});

app.get("/todos", (req, res) => {
    const todoList = getAllToDo();
    res.json(todoList);
});

app.post("/todos", (req, res) => {
    let newToDo = setUpToDo(req.body);
    const todo = persist.addToDo(newToDo);
    res.json(todo);
});

app.put("/todos/:id", (req, res) => {
    const id = req.params.id;
    let newToDo = setUpToDo(req.body);
    const todo = persist.putToDo(newToDo, id);
    res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    const todoList = persist.deleteToDo(id);
    res.json(todoList);
});

app.patch("/todos/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.patchToDo(req.body, id);
    res.json(todo);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

setUpToDo = function (todoReq) {
    let deadline = new Date();
    let done = false;
    if(todoReq.done){
        done = todoReq.done;
    }
    if(todoReq.deadline) {
        deadline = new Date(todoReq.deadline);
    }
    // check keys make sure they match
    // set defaults if no key exists
    return {
        "name": todoReq.name || "",
        "description": todoReq.description || "",
        "done": done,
        "deadline": deadline,
    };
};