const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ message: "Authorization header missing or incorrect" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(400).json({ message: "Token missing" });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decodedToken.id; // Attach user ID to request object for further processing
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
};
