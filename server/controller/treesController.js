import treeModel from "../models/treesModel.js";

const getAllTrees = async (req, res) => {
  const allTrees = await treeModel.find({});
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

export { getAllTrees };
