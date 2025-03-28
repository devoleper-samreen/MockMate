import { User } from "../models/user.model.js"
import { generateAccessAndRefreshToken } from "../helper/authToken.js"
import bcrypt from "bcryptjs"

export const registerUser = async (req, res) => {
    console.log("req.body", req.body);

    const { name, email, password } = req.body


    const existedUser = await User.findOne({ email })

    if (existedUser) {
        return res.status(409).json({
            message: "user with email already exists"
        })
    }

    //user details ko db mein store karo
    const user = await User.create({
        name,
        email,
        password,
    })

    //return response
    return res.status(201).json({
        message: "user register seccessfully",
        user
    })

}

export const loginUser = async (req, res) => {

    const { email, password } = req.body


    const user = await User.findOne({ email })

    //agar user nahi hain to error
    if (!user) {
        return res.status(404).json({
            message: "user does not exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const isPasswordValid = await bcrypt.compare(password, hashedPassword)


    if (!isPasswordValid) {
        return res.status(401).json({
            message: "password is wrong"
        })
    }

    //access or refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    //optional step
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    //send cookie
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).
        cookie("token", accessToken, options).
        cookie("refeshToken", refreshToken, options).
        json({
            user: loggedInUser,
            accessToken,
            refreshToken
        })
}


export const googleAuthSuccess = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const { token } = req.user;

    res.cookie("token", token, {
        httpOnly: true,
        secure: false
    });


    res.redirect("http://localhost:5173/")

};

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

export const getMe = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "user found successfully!",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id
        const { name, email, role, profile } = req.body

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name,
                email,
                role,
                profile
            },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(400).json({
                message: 'Profile not updated',
            })
        }

        return res.status(200).json({
            message: 'Profile updated successfully!',
            updatedUser
        })

    } catch (error) {

        console.error("Error while updating profile:", error);
        return res.status(500).json({
            message: "error while updating profile",
            error: error.message
        })

    }

}


