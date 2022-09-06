const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connection");
const route = require("./routes");
const cors = require("cors");

const port = process.env.PORT || 5000;

const corsOption = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/",route);


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
