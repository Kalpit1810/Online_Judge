import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/Users.js";
import dotenv from "dotenv"

dotenv.config();

const userRegisterControl = async (req, res) => {
  const { userName, userPassword, userEmail } = req.body;

  try {
    const user = await userModel.findOne({ userName: userName });
    const user1 = await userModel.findOne({ userEmail });

    // Check if user already Exists.
    if (user) {
      console.log("User already exist!");
      return res.json({
        message: `User with user name ${userName} already exists!`,
      });
    } else if (user1) {
      console.log("User already exist!");
      return res.json({
        message: `User with email ${userEmail} already exists!`,
      });
    }

    // Add new user
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const newUser = new userModel({
      userName,
      userPassword: hashedPassword,
      userEmail,
    });
    await newUser.save();

    res.json({ message: "User Registered Successfully!!" });
    console.log("User Registered Successfully!!");
  } catch (error) {
    console.log("Error Finding User", error.message);
  }
};

const userLoginControl = async (req, res) => {
  const { userName, userPassword } = req.body;

  // check User's existence
  try {
    const user = await userModel.findOne({ userName: userName });

    if (!user) {
      console.log(`User:${userName} does't exist!`);
      return res.json({
        message: `User with user name ${userName} doesnot exist!`,
      });
    }

    // Check for passwword validity
    const passwordValid = await bcrypt.compare(userPassword, user.userPassword);

    if(!passwordValid)
    {
      res.json({message: "Password doesn't match. Recheck User Name and Password"});
      console.log("password or user name doesn't match");
    }

    // create jwt token
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET);

    res.json({token, userID: user._id});
    console.log("User LogedIn Successfully!!");
  } catch (error) {
    console.log("Error Finding User", error.message);
  }
};

export { userRegisterControl, userLoginControl };
