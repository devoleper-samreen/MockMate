import express from "express";
import { updateProfile } from "../controllers/auth.controller.js"
import { authenticateUser } from "../middleware/auth.middleware.js"

const router = express.Router();

router.put('/update', authenticateUser, updateProfile)

export default router