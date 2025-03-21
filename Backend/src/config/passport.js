import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("Google Auth Strategy triggered!");

                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleAuth: true,
                        role: "candidate", // Default role
                        profile: {},
                    });

                    await user.save();
                }

                // JWT Token Generate
                const token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                        role: user.role
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                );

                done(null, { user, token });
            } catch (error) {
                console.error("Error in Google Auth Strategy:", error);
                done(error, null);
            }
        }
    )
);

export default passport;
