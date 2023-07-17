import { problemModel } from "../models/problems.js";

export const problemListControl = async (req, res) => {
  try {
    const data = await problemModel.find({});
    res.json(data);
    console.log("List Fetched Successfully");
  } catch (error) {
    res.json(error);
    console.log("Error Catching List", error.message);
  }
};
