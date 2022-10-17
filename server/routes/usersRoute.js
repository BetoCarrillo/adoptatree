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
} from "../controller/usersController.js";
import { multerUploads } from "../middlewares/multer.js";
import jwtAuth from "../utils/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);
router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile", jwtAuth, getProfile);
router.delete("/delete", removeProfile);
router.put("/userName", changeUserName);
router.put("/email", changeEmail);

export default router;
