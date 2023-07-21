import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    problemName: {type: String, required: true, unique: true},
    problemStatemant: {type: String, required: true},
    problemDifficulty: {type: String, required: false}
});

export const problemModel = mongoose.model("problems",problemSchema);