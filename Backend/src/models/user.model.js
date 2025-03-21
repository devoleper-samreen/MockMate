import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        role: {
            type: String,
            enum: ["candidate", "interviewer"],
            required: true,
        },
        socketId: {
            type: String,
            default: null
        },
        profile: {
            experience: {
                type: String, // Ex: "2 years", "Fresher"
                default: "Fresher",
            },
            skills: {
                type: [String], // Ex: ["React", "Node.js", "MongoDB"]
                default: [],
            },
            resume: {
                type: String, // Resume ka URL
                default: null,
            },
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

