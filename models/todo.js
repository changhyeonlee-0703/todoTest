const Todo = require("../schemas/todo");
const moment = require("moment");
const todo = require("../schemas/todo");
const { exists } = require("../schemas/todo");

exports.createTodo = async (work, isDone, color) => {
  try {
    const existedTodo = await Todo.findOne({
      createAt: moment().format("2022-09-01"),
    });

    if (existedTodo) {
      existedTodo.todoArr.push({ work, isDone, color });
      await existedTodo.save();
      return "push success";
    } else {
      await Todo.create({ todoArr: [{ work, isDone, color }] });
      return "create success";
    }
  } catch (err) {
    return err;
  }
};

exports.getTodo = async () => {
  try {
    const existedTodo = await Todo.findOne({
      createAt: moment().format("2022-09-01"),
    });
    if (existedTodo) {
      return existedTodo;
    } else {
      return "오늘의 할일이 없습니다.";
    }
  } catch (err) {
    return err;
  }
};

exports.putTodo = async (todoId, work, color) => {
  try {
    const existedTodo = await Todo.findOne({
      createAt: moment().format("2022-09-01"),
    });
    let todoArrIdx = undefined;
    if (existedTodo) {
      existedTodo.todoArr.map((todo, idx) => {
        if (todo._id.equals(todoId)) {
          todoArrIdx = idx;
        }
      });
      existedTodo.todoArr[todoArrIdx].work = work;
      existedTodo.todoArr[todoArrIdx].color = color;
      await existedTodo.save();
      return "todo update success";
    } else {
      throw new Error("데이터가 없습니다.");
    }
  } catch (err) {
    return err;
  }
};

exports.isDoneTodo = async (todoId, isDone) => {
  try {
    const existedTodo = await Todo.findOne({
      createAt: moment().format("2022-09-01"),
    });
    let todoArrIdx = undefined;
    if (existedTodo) {
      existedTodo.todoArr.map((todo, idx) => {
        if (todo._id.equals(todoId)) {
          todoArrIdx = idx;
        }
      });
      existedTodo.todoArr[todoArrIdx].isDone = isDone;
      await existedTodo.save();
      return "isdone update success";
    } else {
      throw new Error("데이터가 없습니다.");
    }
  } catch (err) {
    return err;
  }
};

exports.deleteTodo = async (todoId) => {
  try {
    const existedTodo = await Todo.findOne({
      createAt: moment().format("2022-09-01"),
    });
    let todoArrIdx = undefined;
    if (existedTodo) {
      existedTodo.todoArr.map((todo, idx) => {
        if (todo._id.equals(todoId)) {
          todoArrIdx = idx;
        }
      });
      existedTodo.todoArr.splice(todoArrIdx, 1);
      await existedTodo.save();
      return "todo update success";
    } else {
      throw new Error("데이터가 없습니다.");
    }
  } catch (err) {
    return err;
  }
};
