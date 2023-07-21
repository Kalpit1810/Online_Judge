import { submissionModel } from "../models/Submissions.js";
import { userModel } from "../models/Users.js";

export const submissionControl = async(req,res) => {

    try {
        let data = await submissionModel.find({}).sort({date: -1});
        res.json(data);
        console.log("Submission List Fetched Successfully");
      } catch (error) {
        res.json(error);
        console.log("Error Catching List", error.message);
      }
    
};
