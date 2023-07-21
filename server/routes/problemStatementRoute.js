import express from "express";
import problemStatementControl from "../controller/problemStatementControl.js"
import submitControl from "../controller/submitControl.js"
import multer from "multer";
import {v4 as uuid} from "uuid"

const problemStatementRouter=express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:\\Dev_Project\\Online_Judge\\server\\submissions')
    },
    filename: function (req, file, cb) {
      cb(null, `${uuid()}.cpp`)
    }
  });

const uploadPath = multer({storage: storage});

problemStatementRouter.get("/:problemID",problemStatementControl);
problemStatementRouter.post("/:problemID/submit",uploadPath.single('file'),submitControl);

export default problemStatementRouter;