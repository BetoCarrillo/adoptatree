import treeModel from "../models/treesModel.js";

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

export { getAllTrees, getTreesByType };
