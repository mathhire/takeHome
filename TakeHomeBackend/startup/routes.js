const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const errorHandler = require("./../api/middleware/error.middleware");

const authRoutes = require("./../api/routes/auth.routes");
const resourceRoutes = require("./../api/routes/resource.routes");
const { User } = require("../api/data/user.model");
const { Resource } = require("../api/data/resource.model");

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "./../public/uploads"))
  );

  /* Logging every request  */
  app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
  });

  /* For Cors Issue */

  const allowedOrigins = [
    "http://localhost:3001",
    "http://localhost:3003",
    "http://localhost:3000",
  ];

  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );

  app.use(express.json());
  app.get("/", (req, res) => res.send("Hello World!"));
  app.get("/api", (req, res) => res.send("Hello API World!"));

  const user = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  const resouce = JSON.parse(fs.readFileSync("./response.json", "utf-8"));

  // console.log(resouce.data);

  // import data to MongoDB
  const importData = async () => {
    try {
      await Resource.create(resouce.data);
      console.log("data successfully imported");
      // to exit the process
      process.exit();
    } catch (error) {
      console.log("error", error);
    }
  };
  // importData();
  app.use("/api/auth", authRoutes);
  app.use("/api/resources", resourceRoutes);
  app.use(errorHandler.errorMiddleware);
};
