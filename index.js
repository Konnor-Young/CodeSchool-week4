// initiate express server
const express = require('express');
const app = express();

//initiate command line flags
const flags = require('flags');
flags.defineNumber("port", 3000, "Ports for http server");
flags.parse();

// initiate env variables
const dotenv = require('dotenv');

// set up port # catch-all
const port = flags.get("port") || process.env.PORT || 4000;

//server paths and handlers
app.get("/todo", (req, res) => {
    res.send("<h1>Todo</h1>");
});

app.get("/todos", (req, res) => {
    res.send("<h1>Todo List</h1>");
});

app.post("/todos", (req, res) => {
    res.send("<h1>Post List</h1>");
});

app.delete("/todos", (req, res) => {
    res.send("<h1>Delete List</h1>");
});

app.put("/todos", (req, res) => {
    res.send("<h1>Put List</h1>");
});

app.patch("/todos", (req, res) => {
    res.send("<h1>Patch List</h1>");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});