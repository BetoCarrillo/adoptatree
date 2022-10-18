import usersModel from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { issueToken } from "../utils/jwt.js";
import { body, validationResult } from "express-validator";

const uploadUserPicture = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "adoptatree",
    });
    console.log("uploadResult", uploadResult);
    res.status(200).json({
      message: "Image upload succesfull",
      imageUrl: uploadResult.url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "image couldn't be uploaded", error: error });
  }
};

const getAllUsers = async (req, res) => {
  const allUsers = await usersModel.find({}).populate({ path: "tree" });
  try {
    res.status(200).json({
      allUsers,
      number: usersModel.length,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
      error: error,
    });
  }
};

const signUp = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const existingUser = await usersModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({
        msg: "user already exists",
      });
    } else {
      /*     app.post(
        "/users",
        body("email").isEmail(),
        body("password").isLength({ min: 4 }),
        (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          } */

      /*    User.create({
            username: req.body.username,
            password: req.body.password,
          }).then((user) => res.json(user)); 
        }
      );*/

      /*      app.post(
        "/users",
        body("email").isEmail(),
        body("password").isLength({ min: 4 }),
        (req, res) => {  
          
        }
      ); */

      /* body('email').isEmail(), body('password').isLength({ min: 4 }), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } */
      // good place to use express validator middleware, to validate email/password/any other fields.
      const hashedPassword = await encryptPassword(req.body.password);
      const newUser = new usersModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        avatarPicture: req.body.avatarPicture,
      });
      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
            avatarPicture: savedUser.avatarPicture,
          },
          msg: "User Registered successfully",
        });
      } catch (error) {
        res
          .status(409)
          .json({ message: "error while saving new user", error: error });
      }
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "registration not possible", error: error });
  }
};

const login = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const existingUser = await usersModel.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(401).json({ msg: "user not found" });
    } else {
      const verified = await verifyPassword(
        req.body.password,
        existingUser.password
      );
      if (!verified) {
        res.status(401).json({ msg: "wrong password" });
      }
      if (verified) {
        console.log("user is logged in");
        const token = issueToken(existingUser.id);
        console.log("token", token);
        res.status(201).json({
          msg: "user is logged in",
          user: {
            userName: existingUser.userName,
            email: existingUser.email,
            id: existingUser._id,
            avatarPicture: existingUser.avatarPicture,
          },
          token,
        });
      }
    }
  } catch (error) {}
};

const getProfile = async (req, res) => {
  console.log("req.user", req.user);
  res.status(201).json({
    userName: req.user.userName,
    email: req.user.email,
    id: req.user.id,
    avatarPicture: req.user.avatarPicture,
  });
};

const removeProfile = async (req, res) => {
  try {
    const remove = await usersModel.deleteOne(req.body_id);
    console.log("remove????", remove);
    res.status(201).json({
      msg: "User deleted successfully",
    });
  } catch (error) {
    res
      .status(409)
      .json({ message: "error while deleting profile", error: error });
    console.log("error", error);
  }
};

const changeEmail = async (req, res) => {
  console.log("req.body????", req.body._id);
  try {
    const changeEmail = await usersModel.findOneAndUpdate(
      req.body_id,
      {
        email: req.body.email,
      },
      { returnOriginal: false }
    );
    res.status(201).json({
      msg: "email changed",
    });
    console.log("changeEmail????", changeEmail);
  } catch (error) {
    res
      .status(409)
      .json({ message: "error while changing email", error: error });
    console.log("error", error);
  }
};

const changeUserName = async (req, res) => {
  console.log("req.body????", req.body._id);
  try {
    const changeUserName = await usersModel.findOneAndUpdate(
      req.body_id,
      {
        userName: req.body.userName,
      },
      { returnOriginal: false }
    );
    res.status(201).json({
      msg: "name changed",
    });
    console.log("changeUserName????", changeUserName);
  } catch (error) {
    res
      .status(409)
      .json({ message: "error while changing user name", error: error });
    console.log("error", error);
  }
};

export {
  removeProfile,
  getAllUsers,
  uploadUserPicture,
  signUp,
  login,
  getProfile,
  changeEmail,
  changeUserName,
};
