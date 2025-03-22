import { User } from "../models/user.model.js"
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


    res.redirect("http://localhost:5173/select-interview")

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

        const user = await User.findById(req.user.id);
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

