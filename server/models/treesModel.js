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
  Date: {
    type: Date,
    default: Date.now,
    max: Date.now + 1,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const treeModel = mongoose.model("tree", treesSchema);

export default treeModel;
