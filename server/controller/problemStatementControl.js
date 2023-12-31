import { problemModel } from "../models/problems.js";

const problemStatementControl = async (req, res) => {
  const problemID = req.params.problemID;
  
  try {
    const problem = await problemModel.findOne({_id:  problemID});
    res.json(problem);
    console.log("Problem Fetched Successfully");
  } catch (error) {
    console.log("Error fetching Problem", error.message);
  }
  
};

export default problemStatementControl;
