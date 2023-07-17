import express from "express"
import { problemListControl} from "../controller/problemListControl.js";

const problemListRouter=express.Router();

problemListRouter.get("/",problemListControl);

export default problemListRouter;