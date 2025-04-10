import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {

    const token = req.cookies?.token;
    //console.log("token: ", token);

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, token missing!"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token!"
        });
    }
};
