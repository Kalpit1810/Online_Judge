import express from "express"
import {submissionControl} from "../controller/submissionControl.js"

const submissionRouter = express.Router();

submissionRouter.get("/", submissionControl);

export default submissionRouter;