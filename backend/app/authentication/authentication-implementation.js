const UserModel = require('../../app/feature/users/models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const log = require('../database-connection/logfile');
const accessTokenExpirationMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        log.Info("@@@userName "+userName)
        log.Info("#####password "+password);
        
        // Find user by username (assuming UserModel is Sequelize model)
        const existingUser = await UserModel.findOne({ where: { userName: userName, isArchived: false } });

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Username or password is invalid" });
        }

        // Prepare token payload
        const tokenPayload = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role // Add other non-sensitive information as needed
        };

        // Sign JWT token with payload
        const accessToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '24h' });

        // Generate refresh token (if needed)
        const refreshToken = jwt.sign(tokenPayload, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' }); // Example: 7 days

        // Calculate expiration time in milliseconds
        const expiredInMs = Date.now() + accessTokenExpirationMs;

        // Set token as HTTP-only cookie (optional, depending on your frontend architecture)
        res.cookie("token", accessToken, { httpOnly: true, maxAge: accessTokenExpirationMs });

        // Respond with tokens and expiration time
        res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiredInMs: expiredInMs,
            message: "Login successful"
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const logout = async (req, res) => {
    try {
        // Clear cookies for token and any other relevant session information
        res.clearCookie("token", { httpOnly: true });
        // Optionally clear other cookies if used
        // res.clearCookie("currentUser", { httpOnly: true });

        // Respond with logout success message
        res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        // Handle any errors that occur during logout
        console.error("Logout error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { login, logout };
