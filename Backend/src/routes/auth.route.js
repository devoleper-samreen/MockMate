import express from "express";
import passport from "passport";
import { googleAuthSuccess, logout } from "../controllers/auth.controller.js"

const router = express.Router();

// Google Auth Route (User will be redirected to Google)
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
})
);

// Google Auth Callback Route
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", session: false }), googleAuthSuccess);

router.get("/logout", logout);


export default router;

