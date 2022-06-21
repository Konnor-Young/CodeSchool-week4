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

module.exports = {
    setUpToDo,
};