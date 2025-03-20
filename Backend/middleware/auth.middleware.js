import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, token missing!"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token!"
        });
    }
};
