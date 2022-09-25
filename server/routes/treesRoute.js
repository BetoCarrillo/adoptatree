import express from "express";
import { getAllTrees } from "../controller/treesController.js";
import treeModel from "../models/treesModel.js";

const router = express.Router();
router.get("/all", getAllTrees);

export default router;
