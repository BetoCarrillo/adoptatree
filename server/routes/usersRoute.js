import express from "express";
import {
  getAllUsers,
  uploadUserPicture,
  signUp,
  login,
  getProfile,
  removeProfile,
  changeUserName,
  changeEmail,
  updateUserPicture,
  getAllUserSearch,
  getMyTrees,
  likes,
  unlikes,
} from "../controller/usersController.js";
import { multerUploads } from "../middlewares/multer.js";
import jwtAuth from "../utils/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllUsers);
// router.get("/all/:email", getMyTrees);
router.post("/search", getAllUserSearch);
router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);
router.put(
  "/moreImageUpload",
  multerUploads.single("image"),
  updateUserPicture
);
router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile", jwtAuth, getProfile);
router.get("/mytrees", getMyTrees);

router.delete("/delete", removeProfile);
router.put("/userName", changeUserName);
router.put("/email", changeEmail);
router.put("/likes", likes);
router.put("/unlikes", unlikes);

export default router;
