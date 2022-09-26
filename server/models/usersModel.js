import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  tree: [{ type: mongoose.Schema.Types.ObjectId, ref: "tree" }],
});

const usersModel = mongoose.model("user", userSchema);
export default usersModel;
