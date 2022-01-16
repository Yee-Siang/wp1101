import Todo from "../model/todo";

function MemoApi(app) {
    app.post("/api/newTodo", async(req, res) => {
        console.log("receive a new Todo post");
        console.log(req.body);
        const {user, todo, date} = req.body;
        
        const existing = await Todo.findOne({UserID:user, Todo:todo, Day:date});
        if (!existing) {
            try {
                const newTodo = new Todo({UserID:user, Todo:todo, Day:date, State:"Active"});
                newTodo.save();
                res.json({UserID:user, Todo:todo, Day:date, State:"Active", message:"Success"});
            } catch (e) {
                res.json({UserID:user, Todo:todo, Day:date, State:"Active", message:"Error"});
                throw new Error("Todo creation error" + e);
            }
        }
        else {
            console.log("repeated Todo");
            res.json({UserID:user, Todo:todo, Day:date, State:"Active", message:"Repeated Todo"});
        }
    });

    app.post("/api/allTodo", async(req, res) => {
        console.log("receive a all Todo post");
        console.log(req.body);
        const {user} = req.body;
        
        const existing = await Todo.find({UserID:user}).sort({Day:1});
        //console.log(existing);
        if (!existing) {
            res.json({Todos:[], message:"No Todo"});
        }
        else {
            res.json({Todos:existing.map(t => ({UserID:t.UserID, Todo:t.Todo, Day:t.Day, State:t.State, message:"Success"})), message:"Have Todo"});
        }
    });

    app.post("/api/clearAllTodos", async(req, res) => {
        console.log("receive a clear all Todo post");
        console.log(req.body);
        const {user, range} = req.body;
        if (range == "All") {
            try {
                await Todo.deleteMany({UserID:user});
                console.log("Database deleted");
                res.json({message:"clear all success"});
            } catch (e) {
                res.json({message:"clear all fail"});
                throw new Error("Database deletion fail"); 
            }
        }
        else {
            try {
                await Todo.deleteMany({UserID:user, State:"Complete"});
                console.log("Database deleted");
                res.json({message:"clear complete success"});
            } catch (e) {
                res.json({message:"clear complete fail"});
                throw new Error("Database deletion fail"); 
            }
        }
    });

    app.post("/api/changeTodoState", async(req, res) => {
        console.log("receive a change Todo state post");
        console.log(req.body);
        const {user, task, date} = req.body;
        try {
            const todo = await Todo.findOne({UserID: user, Todo:task, Day:new Date(date)});
            if (todo.State == "Active") {
                todo.State = "Complete"
            }
            else {
                todo.State = "Active"
            }
            todo.save();
            res.json({message:"change State success"});
        } catch (e) {
            res.json({message:"change State fail"});
            throw new Error("change State fail"); 
        }
    });

    app.post("/api/deleteOneTodo", async(req, res) => {
        console.log("receive a delete one Todo post");
        console.log(req.body);
        const {user, task, date} = req.body;
        try {
            await Todo.deleteOne({UserID: user, Todo:task, Day:new Date(date)});
            res.json({message:"delete one success"});
        } catch (e) {
            res.json({message:"delete one fail"});
            throw new Error("delete one fail"); 
        }
    });
}

export default MemoApi;