// user가 있는 버전. 이 repo에선 user가 없는 버전으로 동작함.
exports.createTodo = async (work, isDone, color, user) => {
  let today = moment();
  const todayStart = moment(today).startOf("day");
  const todayEnd = moment(today).endOf("day");
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: todayStart.toDate(),
          $lte: todayEnd.toDate(),
        },
      },
      {
        userId: user._id,
      },
    ],
  });

  if (existedTodo) {
    existedTodo.todoArr.push({ work, isDone, color });
    const result = await existedTodo.save();
    return result.todoArr[result.todoArr.length - 1];
  } else {
    const result = await Todo.create({
      userId: user._id,
      todoArr: [{ work, isDone, color }],
    });
    return result.todoArr[result.todoArr.length - 1];
  }
};

exports.getTodo = async (dayData, user) => {
  const dayStart = moment(dayData).startOf("day");
  const dayEnd = moment(dayStart).endOf("day");
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: dayStart.toDate(),
          $lte: dayEnd.toDate(),
        },
      },
      {
        userId: user._id,
      },
    ],
  });
  if (existedTodo) {
    return existedTodo;
  } else {
    return `${dayData} 에 저장된 할일 리스트가 없습니다.`;
  }
};

exports.putTodo = async (todoId, work, color, user) => {
  let today = moment();

  const todayStart = moment(today).startOf("day");
  const todayEnd = moment(today).endOf("day");
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: todayStart.toDate(),
          $lte: todayEnd.toDate(),
        },
      },
      {
        userId: user._id,
      },
    ],
  });
  let todoArrIdx = false;
  if (existedTodo) {
    existedTodo.todoArr.map((todo, idx) => {
      if (todo._id.equals(todoId)) {
        console.log(todoId);
        todoArrIdx = idx.toString();
        existedTodo.todoArr[idx].work = work;
        existedTodo.todoArr[idx].color = color;
      }
    });
    if (!todoArrIdx) {
      throw new Error("todo id가 없거나 일치하지 않습니다.");
    }
    const result = await existedTodo.save();
    return result.todoArr[Number(todoArrIdx)];
  } else {
    throw new Error("todo에 데이터가 없습니다.");
  }
};

exports.isDoneTodo = async (todoId, isDone, user) => {
  let today = moment();
  const todayStart = moment(today).startOf("day");
  const todayEnd = moment(today).endOf("day");
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: todayStart.toDate(),
          $lte: todayEnd.toDate(),
        },
      },
      {
        userId: user._id,
      },
    ],
  });
  let todoArrIdx = false;
  if (existedTodo) {
    existedTodo.todoArr.map((todo, idx) => {
      if (todo._id.equals(todoId)) {
        todoArrIdx = idx.toString();
        existedTodo.todoArr[idx].isDone = isDone;
      }
    });
    if (!todoArrIdx) {
      throw new Error("todo id가 없거나 일치하지 않습니다.");
    }
    const result = await existedTodo.save();
    return result.todoArr[Number(todoArrIdx)];
  } else {
    throw new Error("todo에 데이터가 없습니다.");
  }
};

exports.deleteTodo = async (todoId, user) => {
  let today = moment();
  const todayStart = moment(today).startOf("day");
  const todayEnd = moment(today).endOf("day");
  const existedTodo = await Todo.findOne({
    $and: [
      {
        createdAt: {
          $gte: todayStart.toDate(),
          $lte: todayEnd.toDate(),
        },
      },
      {
        userId: user._id,
      },
    ],
  });
  let todoArrIdx = false;
  if (existedTodo) {
    existedTodo.todoArr.map((todo, idx) => {
      if (todo._id.equals(todoId)) {
        todoArrIdx = idx.toString();
        existedTodo.todoArr.splice(idx, 1);
      }
    });
    if (!todoArrIdx) {
      throw new Error("todo id가 없거나 일치하지 않습니다.");
    }
    await existedTodo.save();
    return true;
  } else {
    throw new Error("todo에 데이터가 없습니다.");
  }
};



// user가 없는 버전.
// const Todo = require("../schemas/todo");
// const moment = require("moment");

// exports.createTodo = async (work, isDone, color) => {
//   const today = moment().startOf("day");
//   const existedTodo = await Todo.findOne({
//     createdAt: {
//       $gte: today.toDate(),
//       $lte: moment(today).endOf("day").toDate(),
//     },
//     // function (err, result) {
//     //   if(err) return new Error(err);
//     // }
//   });

//   if (existedTodo) {
//     existedTodo.todoArr.push({ work, isDone, color });
//     const result = await existedTodo.save();
//     return result.todoArr[result.todoArr.length - 1];
//   } else {
//     const result = await Todo.create({ todoArr: [{ work, isDone, color }] });
//     return result.todoArr[result.todoArr.length - 1];
//   }
// };

// exports.getTodo = async (dayData) => {
//   const day = moment(dayData).startOf("day");
//   const existedTodo = await Todo.findOne({
//     createdAt: {
//       $gte: day.toDate(),
//       $lte: moment(day).endOf("day").toDate(),
//     },
//   });
//   if (existedTodo) {
//     return existedTodo;
//   } else {
//     return `${dayData} 에 저장된 할일 리스트가 없습니다.`;
//   }
// };

// exports.putTodo = async (todoId, work, color) => {
//   const today = moment().startOf("day");
//   const existedTodo = await Todo.findOne({
//     createdAt: {
//       $gte: today.toDate(),
//       $lte: moment(today).endOf("day").toDate(),
//     },
//   });
//   let todoArrIdx = undefined;
//   if (existedTodo) {
//     existedTodo.todoArr.map((todo, idx) => {
//       if (todo._id.equals(todoId)) {
//         todoArrIdx = idx;
//       }
//     });
//     existedTodo.todoArr[todoArrIdx].work = work;
//     existedTodo.todoArr[todoArrIdx].color = color;
//     const result = await existedTodo.save();
//     return result.todoArr[todoArrIdx];
//   } else {
//     throw new Error("데이터가 없습니다.");
//   }
// };

// exports.isDoneTodo = async (todoId, isDone) => {
//   const today = moment().startOf("day");
//   const existedTodo = await Todo.findOne({
//     createdAt: {
//       $gte: today.toDate(),
//       $lte: moment(today).endOf("day").toDate(),
//     },
//   });
//   let todoArrIdx = undefined;
//   if (existedTodo) {
//     existedTodo.todoArr.map((todo, idx) => {
//       if (todo._id.equals(todoId)) {
//         todoArrIdx = idx;
//       }
//     });
//     existedTodo.todoArr[todoArrIdx].isDone = isDone;
//     const result = await existedTodo.save();
//     return result.todoArr[todoArrIdx];
//   } else {
//     throw new Error("데이터가 없습니다.");
//   }
// };

// exports.deleteTodo = async (todoId) => {
//   const today = moment().startOf("day");
//   const existedTodo = await Todo.findOne({
//     createdAt: {
//       $gte: today.toDate(),
//       $lte: moment(today).endOf("day").toDate(),
//     },
//   });
//   let todoArrIdx = undefined;
//   if (existedTodo) {
//     existedTodo.todoArr.map((todo, idx) => {
//       if (todo._id.equals(todoId)) {
//         todoArrIdx = idx;
//       }
//     });
//     existedTodo.todoArr.splice(todoArrIdx, 1);
//     await existedTodo.save();
//     return true;
//   } else {
//     throw new Error("데이터가 없습니다.");
//   }
// };
