import express from "express";
import { config } from "dotenv";
import path from "path";
import userRouter from "./Routers/user.js";
import taskRouter from "./Routers/task.js";
import CookieParser from "cookie-parser";
import cors from "cors";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

//configer dotenv path
config({ path: path.join(path.resolve(), "/Config/config.env") });

//creating an instance of express
export const app = express();

//cors option
var corsOptions = {
  origin: [
    "https://totofrontend.vercel.app",
    "https://totofrontend.vercel.app/",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(CookieParser());
// app.use(express.static(path.join(__dirname, "../Simple_todo/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../Simple_todo/dist/index.html"));
// });

//routes
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
