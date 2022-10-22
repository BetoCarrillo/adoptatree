import usersModel from "../models/usersModel.js";
import treeModel from "../models/treesModel.js";
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

const updateUserPicture = async (req, res) => {
  try {
    console.log("req.file :>> ", req.file);
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "adoptatree",
    });
    console.log("uploadResult", uploadResult);
    if (uploadResult) {
      console.log("req.body._id", req.body._id);
      try {
        const userPhoto = await usersModel.findOneAndUpdate(
          req.body._id,
          {
            avatarPicture: uploadResult.url,
          },
          { returnOriginal: false }
        );

        res.status(200).json({
          msg: "new picture saved",
          images: userPhoto.avatarPicture,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "error while uploading photo", error: error });
        console.log("error", error);
      }
    }
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

const getAllUserSearch = async (req, res) => {
  const requestedSearch = await usersModel.find({
    $text: { $search: req.body.$text },
  });
  try {
    if (requestedSearch.lenght === 0) {
      res.status(200).json({
        msg: "no users",
      });
    } else {
      res.status(200).json({
        allUsers: requestedSearch,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
      erorr,
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
        const token = issueToken(req.body.email);
        // if we want to generate token on signup (leaving user logged in right)
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
            avatarPicture: savedUser.avatarPicture,
          },
          token,
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
        const token = issueToken(existingUser.email);
        console.log("token", token);
        res.status(201).json({
          msg: "user is logged in",
          user: {
            userName: existingUser.userName,
            email: existingUser.email,
            id: existingUser._id,
            avatarPicture: existingUser.avatarPicture,
            likes: existingUser.likes,
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
    likes: req.user.likes,
  });
};

const getMyProfile = async (req, res) => {
  const existingUser = await usersModel
    .findOne({ email: req.body.email })
    .populate({
      path: "trees",
      select: ["name", "type", "location", "comment", "date", "img", "likes"],
    })
    .exec();
  console.log("Get my profile:", myProfile);
  try {
    if (requestedSearch.lenght === 0) {
      res.status(200).json({
        msg: "no users",
      });
    } else {
      res.status(200).json({
        allUsers: requestedSearch,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
      erorr,
    });
  }

  // const myProfile = await usersModel
  //   .findOne({ _id: userId })
  //   .populate({
  //     path: "trees",
  //     select: ["name", "type", "location", "comment", "date", "img", "likes"],
  //   })
  // .populate({
  //   path: "likes",
  //   select: ["name", "type", "location", "comment", "date", "img", "likes"],
  // })
  //   .exec();
  // console.log("Get my profile:", myProfile);
  // try {
  //   if (myProfile === null || myProfile === undefined) {
  //     res.status(200).json({ msg: "Nothing found" });
  //   } else {
  //     res.status(200).json(myProfile);
  //   }
  // } catch (error) {
  //   res.status(500).json({
  //     msg: "Server failed",
  //     error: error,
  //   });
  // }
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

const likes = async (req, res) => {
  console.log("req.body????", req.body);
  const user_id = req.body.user_id;
  const tree_id = req.body.tree_id;

  const userThatLiked = await usersModel.findOne({
    _id: user_id,
  });

  const alreadyLiked = await treeModel
    .findOne({ _id: tree_id })
    .where("likes")
    .equals(`${userThatLiked._id}`);
  console.log("Likedby?", userThatLiked);
  // likes: { $elemMatch: { tree_id } },

  // user_id,
  // { likes: tree_id }
  // { $getField: user_id.likes },
  // { $exists: tree_id }
  // });
  if (!alreadyLiked) {
    try {
      await usersModel.findOneAndUpdate(
        { _id: userThatLiked._id },
        { $push: { likes: tree_id } },
        // { returnOriginal: false },
        { new: true }
      );
    } catch (error) {
      res.status(409).json({ message: "Couldn't save" });
      console.log(" error in like tree:", error);
    }
    try {
      await treeModel.findOneAndUpdate(
        { _id: tree_id },
        { $push: { likes: userThatLiked._id } },
        // { returnOriginal: false },
        { new: true }
      );
    } catch (error) {
      res.status(409).json({ message: "tree couldn't be liked" });
      console.log("error in like tree:", error);
    }
    res.status(200).json({ message: "like added" });
  } else {
    res.status(400).json({ message: "Already added" });
    // console.log("already added:", error);
  }
};

//   try {
//     const treeLike = await treeModel.findOneAndUpdate(
//       req.body,
//       {
//         $inc: { likes: 1 },
//       },
//       { returnOriginal: false }
//     );
//     console.log("treeLike????", treeLike);
//   } catch (error) {
//     res.status(409).json({ message: "error while liking", error: error });
//     console.log("error", error);
//   }
// };

const unlikes = async (req, res) => {
  console.log("req.body????", req.body);
  const user_id = req.body.user_id;
  const tree_id = req.body.tree_id;

  const userThatLiked = await usersModel.findOne({
    _id: user_id,
  });

  const alreadyLiked = await treeModel
    .findOne({ _id: user_id })
    .where("likes")
    .equals(`${userThatLiked._id}`);
  console.log("Likedby?", userThatLiked);
  // likes: { $elemMatch: { tree_id } },

  // user_id,
  // { likes: tree_id }
  // { $getField: user_id.likes },
  // { $exists: tree_id }
  // });
  if (!alreadyLiked) {
    try {
      await usersModel.findByIdAndUpdate(
        { _id: userThatLiked._id },
        { $pull: { likes: tree_id } },
        // { returnOriginal: false },
        { new: true }
      );
    } catch (error) {
      res.status(409).json({ message: "Couldn't save" });
      console.log("remove tree like:", error);
    }
    try {
      await treeModel.findByIdAndUpdate(
        { _id: tree_id },
        { $pull: { likes: userThatLiked._id } },
        // { returnOriginal: false },
        { new: true }
      );
    } catch (error) {
      res.status(409).json({ message: "tree couldn't be unliked" });
      console.log("error unliking tree:", error);
    }
    res.status(200).json({ message: "removed" });
  } else {
    res.status(400).json({ message: "no liked to remove" });
    // console.log("already added:", error);
  }
};

//   try {
//     const treeLike = await treeModel.findOneAndUpdate(
//       req.body,
//       {
//         $inc: { likes: -1 },
//       },
//       { returnOriginal: false }
//     );
//     console.log("treeLike????", treeLike);
//   } catch (error) {
//     res.status(409).json({ message: "error while liking", error: error });
//     console.log("error", error);
//   }
// };

export {
  removeProfile,
  getAllUsers,
  uploadUserPicture,
  signUp,
  login,
  getProfile,
  changeEmail,
  changeUserName,
  getAllUserSearch,
  updateUserPicture,
  getMyProfile,
  likes,
  unlikes,
};
