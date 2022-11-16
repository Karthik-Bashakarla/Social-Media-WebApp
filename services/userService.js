import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Get user
const getUserById = async (req, res) => {
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
const getAllUsers = async (req, res) => {
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

// Update user

const updateUser = async (req, res) => {
  if (req.body?.isAdmin || req.params.id === req.body.userId) {
    if (req.body.password) {
      // generate new hashed password
      try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
      } catch (err) {
        return res.json(err);
      }
    } else {
      try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });

        return res.status(200).json("User details have been updated");
      } catch (err) {
        return res.json(err);
      }
    }
  } else {
    return res
      .status(403)
      .json("Not authorized to perform this action(UPDATE)");
  }
};

// Delete user
const deleteUser = async (req, res) => {
  if (req.body?.isAdmin || req.params.id === req.body.userId) {
    try {
      await User.deleteOne(req.params.id);
      return res
        .status(200)
        .json(`User with id:${req.params.id} has been successfully deleted`);
    } catch (err) {
      return res.json(err);
    }
  } else {
    return res
      .status(403)
      .json("Not authorized to perform this action(DELETE)");
  }
};

export { getUserById, getAllUsers, updateUser, deleteUser };
