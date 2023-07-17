import express from "express";
import problemStatementControl from "../controller/problemStatementControl.js"

const problemStatementRouter=express.Router();

problemStatementRouter.get("/:problemID",problemStatementControl)

export default problemStatementRouter;