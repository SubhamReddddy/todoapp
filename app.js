import express from "express";
import { config } from "dotenv";
import path from "path";
import userRouter from "./Routers/user.js";
import taskRouter from "./Routers/task.js";
import CookieParser from "cookie-parser";
import cors from "cors";

//configer dotenv path
config({ path: path.join(path.resolve(), "/Config/config.env") });

//creating an instance of express
export const app = express();

//cors option
var corsOptions = {
  origin: [`${process.env.FRONTEND}`],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(CookieParser());

//routes
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
