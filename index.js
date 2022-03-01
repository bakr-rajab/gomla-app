const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories.js");
const cors = require("cors");
const chalk = require("chalk");
const log = console.log;
// import {chalk} from 'chalk'

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
// custom middleware
//each request will pass through it
app.use(function (req, res, next) {
  req.user = "Bakr";
  next(); // it will pass the control to next matching route
});

var fs = require("fs");
function mkdir(dirPath, callback) {
  fs.mkdir(dirPath, (err) => {
    callback(err && err.code !== "EEXIST" ? err : null);
  });
}
app.get("/", function (req, res) {
  //   mkdir("./existingDir", (err) => {
  //     if (err) return console.error(err.code);
  //     // Do something with `./existingDir` here
  //   });

  var user = req.user;
  res.status(200).json({ user });
  //   console.log(user); // testuser return res.send(user);
});

//catch error
app.use((err, req, res, next) => {
  //   name = 33;
  //   console.log(name);
  res.status(500).json({ message: err.message });
});

// routes
app.get("/ping", (req, res, next) => {
  next(new Error("Not valid name"));
  //   res.send("pong");
});
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

// app.get('/test',(req,res)=>{
//     res.json({success:1111})
// })
mongoose.connect(
  process.env.LOCAL_DB || `mongodb://127.0.0.1:27017/gomla`,
  { useNewUrlParser: true },
  async (err, db) => {
    if (!err) {
      await app.listen(process.env.PORT || 8080, () => {
        log(
          chalk.yellow.inverse(
            "Bakend is runingon ...http://localhost:%s",
            process.env.PORT || 8080
          )
        );
      });
      log(chalk.green.inverse("db connection successful ... "));
    } else console.warn("db connection errors ...");
  }
);
