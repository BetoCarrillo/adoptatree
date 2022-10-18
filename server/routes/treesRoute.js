import express from "express";
import {
  getAllTrees,
  getTreesByType,
  uploadTreePicture,
  uploadMoreTreePicture,
  adopt,
  likes,
  unlikes,
  comment,
  removeTree,
} from "../controller/treesController.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();
router.get("/all", getAllTrees);
router.get("/all/:type", getTreesByType);
router.post("/imgUpload", multerUploads.single("images"), uploadTreePicture);
router.put(
  "/moreImageUpload",
  multerUploads.single("images"),
  uploadMoreTreePicture
);
router.post("/adopt", adopt);
router.put("/likes", likes);
router.put("/unlikes", unlikes);
router.put("/comments", comment);
router.delete("/delete", removeTree);

export default router;
