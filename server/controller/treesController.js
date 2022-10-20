import treeModel from "../models/treesModel.js";
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
    console.log("uploadResult", uploadResult);
    if (uploadResult) {
      console.log("req.body._id", req.body._id);
      try {
        const treePhoto = await treeModel.findByIdAndUpdate(
          req.body._id,
          {
            $push: { img: uploadResult.url },
          },
          { returnOriginal: false }
        );

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

const getAllTrees = async (req, res) => {
  console.log("req.query", req.query);
  console.log("req.params", req.params);
  console.log("All trees");
  const { location, name, type } = req.query;

  if (name) {
    const requestedName = await treeModel.find({
      name: { $eq: name },
    });
    console.log("requestedName", requestedName);
    try {
      if (requestedName.lenght === 0) {
        res.status(200).json({
          msg: "no trees whith this name",
        });
      } else {
        res.status(200).json({
          allTrees: requestedName,
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "something went wrong",
        erorr,
      });
    }
  }
  if (location) {
    const requestedLocation = await treeModel.find({
      location: { $eq: location },
    });
    console.log("requestedLocation", requestedLocation);
    try {
      if (requestedLocation.lenght === 0) {
        res.status(200).json({
          msg: "no trees",
        });
      } else {
        res.status(200).json({
          allTrees: requestedLocation,
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "something went wrong",
        erorr,
      });
    }
  } else {
    const allTrees = await treeModel.find({}).populate({ path: "user" });
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
  }
};

// const getTreesByLocation = async (req, res) => {
//   console.log("trees By location");
//   console.log("req.params.location>>>>", req.params.location);
//   const requestedLocation = await treeModel
//     .find({ type: req.params.location })
//     .exec();
//   console.log("requestedLocation", requestedLocation);
//   try {
//     if (requestedLocation.lenght === 0) {
//       res.status(200).json({
//         msg: "no trees in this location",
//       });
//     } else {
//       res.status(200).json({
//         requestedLocation,
//         number: requestedLocation.length,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       msg: "something went wrong",
//       erorr,
//     });
//   }
// };

// const getTreesByType = async (req, res) => {
//   /*  console.log("req", req.params.type); */
//   console.log("trees By Type");
//   console.log("req.params", req.params);
//   console.log("req.query", req.query);

//   console.log("query param", req.query);
//   const { likes } = req.query;

//   if (likes) {
//     const requestedTypes = await treeModel.find({
//       type: req.params.type,
//       likes: { $gte: likes },
//     });

//     console.log("requestedTypes", requestedTypes);

//     try {
//       if (requestedTypes.lenght === 0) {
//         res.status(200).json({
//           msg: "no trees of this type",
//         });
//       } else {
//         res.status(200).json({
//           allTrees: requestedTypes,
//           // number: requestedTypes.length,
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         msg: "something went wrong",
//         erorr,
//       });
//     }
//   } else {
//     const requestedTypes = await treeModel.find({ type: req.params.type });

//     console.log("requestedTypes", requestedTypes);

//     try {
//       if (requestedTypes.lenght === 0) {
//         res.status(200).json({
//           msg: "no trees of this type",
//         });
//       } else {
//         res.status(200).json({
//           // requestedTypes,
//           // number: requestedTypes.length,
//           allTrees: requestedTypes,
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         msg: "something went wrong",
//         erorr,
//       });
//     }
//   }
// };

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
        date: req.body.date,
        likes: req.body.likes,
        comment: req.body.comment,
        user: req.body.user,
      });
      try {
        const savedTree = await newTree.save();
        res.status(201).json({
          tree: {
            name: savedTree.name,
            type: savedTree.type,
            location: savedTree.location,
            img: savedTree.img,
            date: savedTree.date,
            likes: savedTree.likes,
            comment: savedTree.comment,
            user: savedTree.user,
          },
          msg: "Tree adopted successfully",
        });
      } catch (error) {
        res
          .status(409)
          .json({ message: "error while saving adopted tree", error: error });
      }
    }
  } catch (error) {}
};

const likes = async (req, res) => {
  console.log("req.body????", req.body._id);
  try {
    const treeLike = await treeModel.findOneAndUpdate(
      req.body,
      {
        $inc: { likes: 1 },
      },
      { returnOriginal: false }
    );
    console.log("treeLike????", treeLike);
  } catch (error) {
    res.status(409).json({ message: "error while liking", error: error });
    console.log("error", error);
  }
};

const unlikes = async (req, res) => {
  try {
    const treeLike = await treeModel.findOneAndUpdate(
      req.body,
      {
        $inc: { likes: -1 },
      },
      { returnOriginal: false }
    );
    console.log("treeLike????", treeLike);
  } catch (error) {
    res.status(409).json({ message: "error while liking", error: error });
    console.log("error", error);
  }
};

const comment = async (req, res) => {
  console.log("req.body????", req.body._id);
  try {
    const treeComment = await treeModel.findOneAndUpdate(
      req.body_id,
      {
        $push: { comment: req.body.comment },
      },

      { returnOriginal: false }
    );
    console.log("treecomment????", treeComment);
  } catch (error) {
    res.status(409).json({ message: "error while commenting", error: error });
    console.log("error", error);
  }
};

const removeTree = async (req, res) => {
  try {
    const remove = await treeModel.deleteOne(req.body_id);
    console.log("remove????", remove);
    res.status(201).json({
      msg: "Tree deleted successfully",
    });
  } catch (error) {
    res.status(409).json({ message: "error while deleting", error: error });
    console.log("error", error);
  }
};

export {
  uploadTreePicture,
  uploadMoreTreePicture,
  getAllTrees,
  // getTreesByType,
  // getTreesByLocation,
  adopt,
  likes,
  unlikes,
  comment,
  removeTree,
};
