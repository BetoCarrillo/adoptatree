import express from "express";
import {
  getAllTrees,
  // getTreesByType,
  // getTreesByLocation,
  uploadTreePicture,
  uploadMoreTreePicture,
  adopt,
  // likes,
  // unlikes,
  comment,
  removeTree,
  getAllTreeSearch,
  getTreesById,
  getTreesByUser,
} from "../controller/treesController.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();
router.get("/all", getAllTrees);
router.post("/search", getAllTreeSearch);
router.get("/id", getTreesById);
router.get("/user", getTreesByUser);
// router.get("/all/:type", getTreesByType);
// router.get("/all/:location", getTreesByLocation);
router.post("/imgUpload", multerUploads.single("images"), uploadTreePicture);
router.put(
  "/moreImageUpload",
  multerUploads.single("images"),
  uploadMoreTreePicture
);
router.post("/adopt", adopt);
// router.put("/likes", likes);
// router.put("/unlikes", unlikes);
router.put("/comments", comment);
router.delete("/delete", removeTree);

export default router;
