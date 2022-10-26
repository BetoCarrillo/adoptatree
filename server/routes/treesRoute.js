import express from "express";
import {
  getAllTrees,
  uploadTreePicture,
  uploadMoreTreePicture,
  adopt,
  comment,
  removeTree,
  getAllTreeSearch,
  getTreesByUser,
} from "../controller/treesController.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();
router.get("/all", getAllTrees);
router.post("/search", getAllTreeSearch);
router.get("/user", getTreesByUser);
router.post("/imgUpload", multerUploads.single("images"), uploadTreePicture);
router.put(
  "/moreImageUpload",
  multerUploads.single("images"),
  uploadMoreTreePicture
);
router.post("/adopt", adopt);
router.put("/comments", comment);
router.delete("/delete", removeTree);

export default router;
