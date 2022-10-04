import mongoose from "mongoose";

const treesSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
    max: Date.now + 1,
  },
  img: {
    type: Array,
  },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const treeModel = mongoose.model("tree", treesSchema);

export default treeModel;
