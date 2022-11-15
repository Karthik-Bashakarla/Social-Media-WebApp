import mongoose from "mongoose";
import User from "../models/User.js";

// Get user
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
    if (ObjectId.isValid(id)) {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json("User not found");
      } else {
        return res.status(200).json(user);
      }
    } else {
      return res.status(400).json("Invalid user id");
    }
  } catch (err) {
    throw new Error(err);
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json("No users in db");
    } else {
      return res.status(200).json(users);
    }
  } catch (err) {
    console.log(err);
  }
};

// Create user

// Update user

// Delete user
