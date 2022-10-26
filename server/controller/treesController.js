import treeModel from "../models/treesModel.js";
import usersModel from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";

const uploadTreePicture = async (req, res) => {
  console.log("req.body", req.body);
  try {
    console.log("req.file :>> ", req.file);
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "adoptedtrees",
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

const uploadMoreTreePicture = async (req, res) => {
  try {
    console.log("req.file :>> ", req.file);
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "adoptedtrees",
    });
    console.log("uploadResult>>>>", uploadResult);
    if (uploadResult) {
      console.log("IF UPLOADHERE IT GETS");
      try {
        const treePhoto = await treeModel.findByIdAndUpdate(
          req.body._id,

          { $push: { img: uploadResult.url } },

          { returnOriginal: false }
        );
        console.log("treePhoto>>>>", treePhoto);

        res.status(200).json({
          msg: "new picture saved",
          images: treePhoto.img,
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

const getAllTreeSearch = async (req, res) => {
  // console.log("req.query", req);
  const requestedSearch = await treeModel
    .find({
      $text: { $search: req.body.$text },
    })
    .sort({ date: "desc" });

  try {
    if (requestedSearch.lenght === 0) {
      res.status(200).json({
        msg: "no trees",
      });
    } else {
      res.status(200).json({
        allTrees: requestedSearch,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
      erorr,
    });
  }
};

const getAllTrees = async (req, res) => {
  const allTrees = await treeModel.find({}).sort({ date: "desc" }).populate({
    path: "user",
  });
  // console.log("allTrees", allTrees);
  try {
    if (allTrees.length === 0) {
      res.status(200).json({
        msg: "no trees in the DB",
      });
    } else {
      res.status(200).json({
        allTrees,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "server failed",
      error: error,
    });
  }
};

const getTreesById = async (req, res) => {
  const requestedTrees = await treeModel
    .find({
      allTrees: req.params._id,
    })
    .exec();
  console.log("requestedTrees", requestedTrees);

  try {
    if (requestedTrees.length === 0) {
      res.status(200).json({
        msg: "no trees with this ID",
      });
    } else {
      res.status(200).json({
        requestedTrees,
        number: requestedTrees.length,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
      error,
    });
  }
};

const getTreesByUser = async (req, res) => {
  const user_id = req.body.user_id;
  const findUser = await usersModel.findOne({
    user_id,
  });
  try {
    const requestedTree = await treeModel
      .find({
        user: {
          $in: [findUser._id],
        },
      })
      .exec();
    console.log("requestedIdTree", requestedTree);
    if (requestedTree.length === 0) {
      res.status(200).json({
        msg: "no trees with this user",
      });
    } else {
      res.status(200).json({
        allTrees: requestedTree,
        Numer: requestedTree.length,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
      erorr,
    });
  }
};

const adopt = async (req, res) => {
  const user_id = req.body._id;

  try {
    const existingName = await treeModel.findOne({ name: req.body.name });
    if (existingName) {
      res.status(409).json({ msg: "name already exists" });
    } else {
      const newTree = new treeModel({
        name: req.body.name,
        type: req.body.type,
        location: req.body.location,
        comment: req.body.comment,
        date: req.body.date,
        img: req.body.img,
        user: user_id,
      });
      console.log("newTree", newTree);

      try {
        const savedTree = await newTree.save();
        res.status(201).json({
          tree: {
            name: savedTree.name,
            type: savedTree.type,
            location: savedTree.location,
            img: savedTree.img,
            date: savedTree.date,
            comment: savedTree.comment,
            user: savedTree.user,
          },
          msg: "Tree adopted successfully",
        });
        console.log("savedTree>>>>>", savedTree._id);

        const adopterUser = await usersModel.findOneAndUpdate(
          {
            _id: user_id,
          },
          { $push: { tree: savedTree._id } },
          { new: true }
        );
        console.log("adopterUser", adopterUser);
      } catch (error) {
        res
          .status(409)
          .json({ message: "error while saving adopted tree", error: error });
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

const comment = async (req, res) => {
  const tree_id = req.body.tree_id;
  const user_id = req.body.user_id;

  const userThatComment = await usersModel.findOne({
    user_id,
  });
  console.log("userThatComment", userThatComment);
  if (userThatComment) {
    try {
      const treeComment = await treeModel.findByIdAndUpdate(
        { _id: tree_id },
        {
          $push: {
            comment: { $each: [req.body.comment, userThatComment.email] },
          },
        },

        { returnOriginal: false }
      );
      console.log("treecomment????", treeComment);
    } catch (error) {
      res.status(409).json({ message: "error while commenting", error: error });
      console.log("error", error);
    }
  }
};

const removeTree = async (req, res) => {
  try {
    const requestedIdTree = await treeModel
      .findById({ _id: req.body._id })
      .exec();
    console.log("requestedIdTree", requestedIdTree);
    if (requestedIdTree) {
      const remove = await treeModel.deleteOne(requestedIdTree);
      console.log("remove????", remove);
      res.status(201).json({
        msg: "Tree deleted successfully",
      });
    }
  } catch (error) {
    res.status(409).json({ message: "error while deleting", error: error });
    console.log("error", error);
  }
};

export {
  uploadTreePicture,
  uploadMoreTreePicture,
  getAllTrees,
  adopt,
  comment,
  removeTree,
  getAllTreeSearch,
  getTreesById,
  getTreesByUser,
};
