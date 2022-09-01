const todo = require("../models/todo");


exports.createTodo = async (req, res) => {
    try{
        const {work, isDone, color} = req.body;
        const result = await todo.createTodo(work, isDone, color);
        res.status(200).json({message : result});
    }
    catch(err){
        res.status(400).json({errMessage: err});
    }
    
};

exports.getTodo = async (req, res) => {
    try{
        const result = await todo.getTodo(); //userId
        res.status(200).json({result});
    }
    catch(err){
        res.status(400).json({errMessage: err});
    }
};

exports.putTodo = async (req, res) => {
    try{
        if (req.body.isDone === true || req.body.isDone === false){
            const {todoArrIdx, isDone} = req.body;
            const result = await todo.isDoneTodo(todoArrIdx, isDone);
            console.log("1")
            res.status(200).json({message : result});
            
        }
        else{
            const {todoArrIdx, work, color} = req.body;
            const result = await todo.putTodo(todoArrIdx, work, color);
            res.status(200).json({message : result});
        }
    }
    catch(err){
        res.status(400).json({errMessage: err});
    }
};

exports.deleteTodo = async (req, res) => {
    try{
        const {todoArrIdx} = req.body;
        const result = await todo.deleteTodo(todoArrIdx); //userId
        res.status(200).json({message : result});
    }
    catch(err){
        res.status(400).json({errMessage: err});
    }
};
