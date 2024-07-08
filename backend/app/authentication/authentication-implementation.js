const UserModel = require('../../app/feature/users/models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email (assuming UserModel is Sequelize model)
        const existingUser = await UserModel.findOne({ where: { email: email, isArchived: false } });

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Email or password is invalid" });
        }

        // Prepare token payload
        const tokenPayload = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role // Add other non-sensitive information as needed
        };

        // Sign JWT token with payload
        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '24h' });

        // Set token as HTTP-only cookie (optional, depending on your frontend architecture)
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 24 hours in milliseconds

        // Respond with token and user information
        res.status(200).json({ token: token, user: existingUser, message: "Login successful" });
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
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        // Handle any errors that occur during logout
        console.error("Logout error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { login, logout };
