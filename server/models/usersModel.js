import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
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
    type: String,
  },
  role: {
    type: String,
  },

  tree: [{ type: mongoose.Schema.Types.ObjectId, ref: "tree" }],
});

const usersModel = mongoose.model("user", userSchema);
export default usersModel;
