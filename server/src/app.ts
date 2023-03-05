import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import postsRouter from "./routes/posts";
import userRouter from "./routes/user";
var cors = require("cors");

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routerSetup();
  }

  private config() {
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    //Set up mongoose connection
    const mongoDB = "mongodb://localhost:27017/harkkadb";
    mongoose.connect(mongoDB);
    mongoose.Promise = Promise;
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    //Set up cors
    this.app.use(
      cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })
    );
  }

  private routerSetup() {
    this.app.use("/api/post", postsRouter);
    this.app.use("/api/user", userRouter);
  }
}

export default new App().app;
