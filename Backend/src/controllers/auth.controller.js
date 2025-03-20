export const googleAuthSuccess = async (req, res) => {
    console.log("heelo...");

    console.log("res.user:", req.user);


    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    console.log("hii...");


    const { user, token } = req.user;



    res.cookie("token", token, {
        httpOnly: true,
        secure: true
    });

    return res.status(200).json({
        success: true,
        message: "Login successful",
        user
    });

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

