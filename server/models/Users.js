import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true }
});

export const userModel = mongoose.model("users", UserSchema );
