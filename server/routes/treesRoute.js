import express from "express";
import {
  getAllTrees,
  // getTreesByType,
  // getTreesByLocation,
  uploadTreePicture,
  uploadMoreTreePicture,
  adopt,
  likes,
  unlikes,
  comment,
  removeTree,
  getAllTreeSearch,
} from "../controller/treesController.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();
router.get("/all", getAllTrees);
router.get("/search", getAllTreeSearch);
// router.get("/all/:type", getTreesByTßype);
// router.get("/all/:location", getTreesByLocation);
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
