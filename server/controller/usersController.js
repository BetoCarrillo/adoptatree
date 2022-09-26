import usersModel from "../models/usersModel.js";

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

export { getAllUsers };
