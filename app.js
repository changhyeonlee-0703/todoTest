const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connection");

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB.connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();