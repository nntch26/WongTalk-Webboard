const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Authentication failed. No token provided." });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        console.log("user", decode);
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token." });
    }
};
