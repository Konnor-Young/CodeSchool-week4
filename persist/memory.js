const todo_db = {};

function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

const getAllToDo = function () {
    console.log("Get All");
    return todo_db;
}

const getToDo = function (id) {
    console.log("Get One");
    return todo_db[id];
}

const addToDo = function (todo) {
    console.log("Post One");
    var id = randomString(8);
    todo.id = id;
    todo_db[id] = todo;
    return todo;
};

const putToDo = function (todo, id) {
    console.log("Put One");
    todo["id"] = id;
    todo_db[id] = todo;
    return todo;
}

const deleteToDo = function (id) {
    console.log("Delete One");
    delete todo_db[id];
    return todo_db;
}

const patchToDo = function (todoValues, id) {
    console.log("Patch One");
    for(const[key] of Object.entries(todo_db[id])){
        if (todoValues[key]) {
            todo_db[id][key] = todoValues[key];
        }
    }
    return todo_db[id];
}

module.exports = {
    addToDo: addToDo,
    getToDo: getToDo,
    getAllToDo: getAllToDo,
    putToDo: putToDo,
    deleteToDo: deleteToDo,
    patchToDo: patchToDo,
};