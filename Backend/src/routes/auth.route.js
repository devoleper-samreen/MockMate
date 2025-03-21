import express from "express";
import passport from "passport";
import { googleAuthSuccess, logout, getMe } from "../controllers/auth.controller.js"
import { authenticateUser } from "../middleware/auth.middleware.js"

const router = express.Router();

// Google Auth Route (User will be redirected to Google)
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
})
);


// Google Auth Callback Route
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login", session: false }), googleAuthSuccess);

router.get("/logout", authenticateUser, logout);
router.get("/get-me", authenticateUser, getMe);


export default router;

