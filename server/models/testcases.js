import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
    problemID: {type: mongoose.Schema.Types.ObjectId ,ref:"problems", required: true},
    TCInput: {type: String, required: true},
    TCOutput: {type: String, required: true}
});

export const testCaseModel = mongoose.model("testcases", testCaseSchema);