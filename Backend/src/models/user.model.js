import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            unique: true,
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
        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}


export const User = mongoose.model("User", userSchema);

