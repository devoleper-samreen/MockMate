import express from "express"
import authRoute from "./auth.route.js"
import profileRoute from "./profile.route.js"

const router = express.Router()

router.use("/auth", authRoute)
router.use('/profile', profileRoute)

export default router