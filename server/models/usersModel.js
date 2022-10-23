import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarPicture: {
    type: Array,
  },

  role: {
    type: String,
  },

  tree: [{ type: mongoose.Schema.Types.ObjectId, ref: "tree" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "tree" }],
});

userSchema.index({ "$**": "text" });

const userModel = mongoose.model("user", userSchema);
export default userModel;
