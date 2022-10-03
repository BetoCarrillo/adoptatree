import express from "express";
import {
/*   getAllUsers,  */
  uploadUserPicture,
  signUp,
} from "../controller/usersController.js";
import { multerUploads } from "../middlewares/multer.js";
const router = express.Router();

/* router.get("/all", getAllUsers);  */

router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);
router.post("/signup", signUp);
export default router;
