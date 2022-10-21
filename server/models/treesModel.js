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
  // likes: {
  //   type: Number,
  // },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

  comment: {
    type: Array,
    date: Date,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  img: {
    type: Array,
  },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

treesSchema.index({ "$**": "text" });

const treeModel = mongoose.model("tree", treesSchema);

export default treeModel;
