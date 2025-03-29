import express from "express";
import { updateProfile } from "../controllers/auth.controller.js"
import { authenticateUser } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router();

router.put('/update', authenticateUser, upload.single('resume'), updateProfile)

export default router