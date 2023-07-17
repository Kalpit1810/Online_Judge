import express, { urlencoded } from "express";
import cors from "cors";
import DBConnection from "../database/db.js"
import userRouter from "../routes/userRoute.js"
import problemListRouter from "../routes/problemListRoute.js"
import problemStatementRouter from "../routes/problemStatementRoute.js"
const app = express();

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/auth",userRouter);
app.use("/problem-list", problemListRouter);
app.use("/problem-statement", problemStatementRouter);

DBConnection();



app.listen("3001", () => console.log("server started!"));
