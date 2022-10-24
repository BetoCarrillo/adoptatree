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

// const getAllTreeSearch = async (req, res) => {
//   const { location, name, type } = req.query;
//   if (name) {
//     const requestedName = await treeModel.find({
//       name: { $eq: name },
//     });
//     console.log("requestedTypes", requestedName);
//     try {
//       if (requestedName.lenght === 0) {
//         res.status(200).json({
//           msg: "no trees whith this name",
//         });
//       } else {
//         res.status(200).json({
//           allTrees: requestedName,
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         msg: "something went wrong",
//         erorr,
//       });
//     }
//   }
//   if (location) {
//     const requestedLocation = await treeModel.find({
//       location: { $eq: location },
//     });
//     console.log("requestedTypes", requestedLocation);
//     try {
//       if (requestedLocation.lenght === 0) {
//         res.status(200).json({
//           msg: "no trees",
//         });
//       } else {
//         res.status(200).json({
//           allTrees: requestedLocation,
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         msg: "something went wrong",
//         erorr,
//       });
//     }
//   }
//   if (type) {
//     const requestedType = await treeModel.find({
//       type: { $eq: type },
//     });
//     console.log("requestedTypes", requestedType);
//     try {
//       if (requestedType.lenght === 0) {
//         res.status(200).json({
//           msg: "no trees",
//         });
//       } else {
//         res.status(200).json({
//           allTrees: requestedType,
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

const getAllTreeSearch = async (req, res) => {
  // console.log("req.query", req);
  const requestedSearch = await treeModel.find({
    $text: { $search: req.body.$text },
  });
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
  console.log("req.query", req.query);
  console.log("req.params", req.params);
  console.log("All trees");
  const { location, name } = req.query;
  if (name) {
    const requestedName = await treeModel.find({
      name: { $eq: name },
    });
    console.log("requestedTypes", requestedName);
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
  } else {
    const allTrees = await treeModel.find({}).populate({
      path: "user",
    });

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

const getTreesById = async (req, res) => {
  try {
    const requestedIdTree = await treeModel
      .find({
        _id: {
          $in: [req.body._id],
        },
      })
      .exec();
    console.log("requestedIdTree", requestedIdTree);
    if (requestedIdTree.length === 0) {
      res.status(200).json({
        msg: "no trees with this ID",
      });
    } else {
      res.status(200).json({
        requestedIdTree,
        allTrees: requestedIdTree.length,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
      erorr,
    });
  }
};

// const getTreesByUserId = async (req, res) => {
//   try {
//     const requestedUser = await usersModel
//       .find({ email: req.body.email })
//       .exec();
//     console.log("requestedUser", requestedUser);
//     if (requestedUser.length === 0) {
//       res.status(200).json({
//         msg: "no user",
//       });
//     } else {
//       res.status(200).json({
//         requestedUser,
//         mytrees: requestedUser.length,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       msg: "something went wrong",
//       erorr,
//     });
//   }
// };

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

// // const getTreesByLocation = async (req, res) => {
// //   console.log("trees By location");
// //   console.log("req.params.location>>>>", req.params.location);
// //   const requestedLocation = await treeModel
// //     .find({ type: req.params.location })
// //     .exec();
// //   console.log("requestedLocation", requestedLocation);
// //   try {
// //     if (requestedLocation.lenght === 0) {
// //       res.status(200).json({
// //         msg: "no trees in this location",
// //       });
// //     } else {
// //       res.status(200).json({
// //         requestedLocation,
// //         number: requestedLocation.length,
// //       });
// //     }
// //   } catch (error) {
// //     res.status(500).json({
// //       msg: "something went wrong",
// //       erorr,
// //     });
// //   }
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
  const user_id = req.body.user_id;
  const userThatAdopt = await usersModel.findOne({
    user_id,
  });
  console.log("user_id", user_id);
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
        user: userThatAdopt._id,
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
        console.log("savedTree>>>>>", savedTree);
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
  // getTreesByType,
  // getTreesByLocation,
  adopt,
  comment,
  removeTree,
  getAllTreeSearch,
  getTreesById,
  getTreesByUser,
};
