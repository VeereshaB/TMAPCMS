const UserModel = require('../../app/feature/users/models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const log = require('../database-connection/logfile');
const Role = require('../feature/roles/models/roles.model');
const UserRole = require('../feature/roles/models/user-role.model');
const Organization = require('../feature/users/models/OrganizationModel');
const accessTokenExpirationMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        console.log("@@REQ"+JSON.stringify(req.body));
        log.Info("@@@userName " + userName)
        log.Info("#####password " + password);

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
const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify token

        // Fetch user roles with associated role details
        const userRoles = await UserRole.findAll({ where: { userId: decoded.id } });
        log.Info("@@userRole   " + JSON.stringify(userRoles));

        // If no user roles found, return 404
        if (!userRoles || userRoles.length === 0) {
            return res.status(404).json({ error: 'User roles not found' });
        }

        // Extract role IDs from userRoles
        const roleIds = userRoles.map(userRole => userRole.roleId);

        // Fetch user details including organization
        const user = await UserModel.findByPk(decoded.id, {
            include: [
                {
                    model: Organization,
                    as: 'organization', // Ensure this matches the alias defined in UserModel.belongsTo(OrganizationModel, { as: 'organization', foreignKey: 'organizationId' });
                    // attributes: ['id', 'organizationName', 'email'] // Include specific attributes if needed
                }
            ]
        });

        // If no user found, return 404
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch roles by role IDs
        const roles = await Role.findAll({
            where: {
                id: roleIds
            },
            attributes: ['id', 'name'] // Include specific attributes if needed
        });

        // Construct the response object with user details and roles
        const userData = {
            ...user.toJSON(), // Convert user instance to JSON
            organization: user.organization,
            roles: roles.map(role => ({
                id: role.id,
                name: role.name
            }))
        };

        res.status(200).json({
            message: 'User found',
            data: userData
        });
    } catch (error) {
        console.error("Get user error:", error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Token expired" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};


module.exports = { login, logout, getUser };
