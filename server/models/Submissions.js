import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  problemName: { type: String, ref: "problems", require: true },
  userName: { type: String, ref: "users", require: true },
  verdict: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

export const submissionModel = mongoose.model("submissions", submissionSchema);
