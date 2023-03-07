const { createServer} = require('http')
const {Server} = require('socket.io')
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
require("colors");

const httpServer = createServer(app)
global.io = new Server(httpServer)

// read json body data
app.use(express.json());
//read files req
app.use(fileUpload());
//read cookies
app.use(cookieParser());

// apis
app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api", require("./routes/apiRoutes"));

//mongodb connection
const connectDB = require("./config/db");
//error handler
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
  next(error);
});

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
  
});

// DB connection and server connection

const PORT = process.env.PORT || 9000;

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`.cyan.underline);
    });
  })
  .catch((error) => {
    console.log(error.red.bold);
  });
