export const googleAuthSuccess = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const { user, token } = req.user;

    res.cookie("token", token, {
        httpOnly: true,
        secure: true
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

