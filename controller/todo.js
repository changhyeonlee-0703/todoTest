// user가 있는 버전(server에 들어가는 버전). 이 repo에선 user가 없는 버전이 동작됨.
const todo = require("../models/todo");

exports.createTodo = asyncWrapper(async (req, res) => {
  const user = req.locals;
  const { work, isDone, color } = req.body;
  if (!work || !color || typeof isDone !== "boolean") {
    throw new Error("입력 값이 없습니다.");
  }
  const result = await todo.createTodo(work, isDone, color, user);
  res.status(200).json(result);
});

exports.getTodo = asyncWrapper(async (req, res) => {
  const user = req.locals;
  const day = req.params.day;
  const result = await todo.getTodo(day, user); //userId
  res.status(200).json({ todoArr: result.todoArr });
});

exports.putTodo = asyncWrapper(async (req, res) => {
  const user = req.locals;
  if (req.body.isDone === true || req.body.isDone === false) {
    const todoId = req.params.id;
    const { isDone } = req.body;
    if (typeof isDone !== "boolean") {
      throw new Error("isDone이 없습니다.");
    }
    const result = await todo.isDoneTodo(todoId, isDone, user);
    res.status(200).json(result);
  } else {
    const todoId = req.params.id;
    const { work, color } = req.body;
    if (!work || !color) {
      throw new Error("입력 값이 없습니다.");
    }
    const result = await todo.putTodo(todoId, work, color, user);
    res.status(200).json(result);
  }
});

exports.deleteTodo = asyncWrapper(async (req, res) => {
  try {
    const user = req.locals;
    const todoId = req.params.id;
    if (!todoId) {
      throw new Error("todo Id가 없습니다.");
    }
    const result = await todo.deleteTodo(todoId, user); //userId
    res.status(200).json({ success: result });
  } catch (err) {
    res.status(400).json({ errMessage: err });
  }
});


// user가 없는 버전
// const todo = require("../models/todo");


// exports.createTodo = async (req, res) => {
//     try{
//         const {work, isDone, color} = req.body;
//         const result = await todo.createTodo(work, isDone, color);
//         res.status(200).json(result);
//     }
//     catch(err){
//         res.status(400).json({errMessage: err});
//     }
    
// };

// exports.getTodo = async (req, res) => {
//     try{
//         const day = req.params.day;
//         const result = await todo.getTodo(day); //userId
//         res.status(200).json({ todoArr : result.todoArr});
//     }
//     catch(err){
//         res.status(400).json({errMessage: err});
//     }
// };

// exports.putTodo = async (req, res) => {
//     try{
//         if (req.body.isDone === true || req.body.isDone === false){
//             const todoId = req.params.id;
//             const {isDone} = req.body;
//             const result = await todo.isDoneTodo(todoId, isDone);
//             res.status(200).json(result);
            
//         }
//         else{
//             const todoId = req.params.id;
//             const {work, color} = req.body;
//             const result = await todo.putTodo(todoId, work, color);
//             res.status(200).json(result);
//         }
//     }
//     catch(err){
//         res.status(400).json({errMessage: err});
//     }
// };

// exports.deleteTodo = async (req, res) => {
//     try{
//         const todoId = req.params.id;
//         const result = await todo.deleteTodo(todoId); //userId
//         res.status(200).json({success : result});
//     }
//     catch(err){
//         res.status(400).json({errMessage: err});
//     }
// };
