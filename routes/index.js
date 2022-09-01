const express = require("express");
const router = express.Router();
const Todo = require("./todo");

router.use("/todo", Todo);

module.exports = router;

