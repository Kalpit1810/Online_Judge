import express from "express";
import { userRegisterControl, userLoginControl } from "../controller/userControl.js";

const userRouter = express.Router();

userRouter.post("/register", userRegisterControl);
userRouter.post("/login", userLoginControl);

export default userRouter;
