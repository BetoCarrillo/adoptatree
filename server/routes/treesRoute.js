import express from "express";
import { getAllTrees, getTreesByType } from "../controller/treesController.js";
import treeModel from "../models/treesModel.js";

const router = express.Router();
router.get("/all", getAllTrees);
router.get("/all/:type", getTreesByType);

export default router;
