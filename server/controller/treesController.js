import treeModel from "../models/treesModel.js";
import { v2 as cloudinary } from "cloudinary";

const uploadTreePicture = async (req, res) =>{
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
}


const getAllTrees = async (req, res) => {
  const allTrees = await treeModel.find({}).populate({ path: "user" });
  console.log("allTrees", allTrees);
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

const getTreesByType = async (req, res) => {
  /*  console.log("req", req.params.type); */
  console.log("query param", req.query);
  const { likes } = req.query;

  if (likes) {
    const requestedTypes = await treeModel.find({
      type: req.params.type,
      likes: { $gte: likes },
    });

    console.log("requestedTypes", requestedTypes);

    try {
      if (requestedTypes.lenght === 0) {
        res.status(200).json({
          msg: "no trees of this type",
        });
      } else {
        res.status(200).json({
          requestedTypes,
          number: requestedTypes.length,
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "something went wrong",
        erorr,
      });
    }
  } else {
    const requestedTypes = await treeModel.find({ type: req.params.type });

    console.log("requestedTypes", requestedTypes);

    try {
      if (requestedTypes.lenght === 0) {
        res.status(200).json({
          msg: "no trees of this type",
        });
      } else {
        res.status(200).json({
          requestedTypes,
          number: requestedTypes.length,
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "something went wrong",
        erorr,
      });
    }
  }
};

const adopt = async (req, res) => {
  console.log("req.body", req.body);
try {
  const existingName = await treeModel.findOne({ name: req.body.name });
  if (existingName) {
    res.status(409).json({ msg: "name already exists" });
  } else {
 // good place to use express validator middleware, to validate email/password/any other fields.
  const newTree = new treeModel({
  name: req.body.name,
  type: req.body.type,
  location: req.body.location,
  img: req.body.img,
  date: req.body.date,  });
  try {
    const savedTree = await newTree.save();
    res.status(201).json({
      tree: {
        name: savedTree.name,
        type: savedTree.type,
        location: savedTree.location,
        img: savedTree.img,
        date: savedTree.date,
      },
      msg: "Tree adopted successfully",
    });
  } catch (error) {
    res
      .status(409)
      .json({ message: "error while saving adopted tree", error: error });
  }
}

} catch (error) {
  
}
};

export {uploadTreePicture, getAllTrees, getTreesByType, adopt };
