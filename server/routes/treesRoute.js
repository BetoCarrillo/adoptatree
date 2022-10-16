import express from "express";
import {
  getAllTrees,
  getTreesByType,
  uploadTreePicture,
  adopt,
  likes,
  unlikes,
  comment,
} from "../controller/treesController.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();
router.get("/all", getAllTrees);
router.get("/all/:type", getTreesByType);
router.post("/imgUpload", multerUploads.single("image"), uploadTreePicture);
router.post("/adopt", adopt);
router.put("/likes", likes);
router.put("/unlikes", unlikes);
router.put("/comments", comment);

export default router;
