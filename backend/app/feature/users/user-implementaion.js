const bcrypt = require('bcrypt');
const UserModel = require('./models/UserModel'); // Adjust path as necessary
const OrganizationModel = require('./models/OrganizationModel'); // Adjust path as necessary
const Role = require('../roles/models/roles.model'); // Adjust path as necessary
const UserRole = require('../roles/models/user-role.model'); // Adjust path as necessary
const log = require('../../database-connection/logfile')

/* create update user and organization */
const createUpdate = async (req, res) => {
    try {
        const { Users, Organization } = req.body;

        // Check if organization already exists
        let organization = await OrganizationModel.findOne({ where: { organizationName: Organization.organizationName } });

        if (!organization) {
            organization = await OrganizationModel.create(Organization);
            console.log('Organization created successfully');
        } else {
            console.log('Organization already exists');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Users.password, salt);
        Users.password = hashedPassword;

        // Create the user
        const newUser = await UserModel.create({
            ...Users,
            organizationId: organization.id 
        });

        // Check if role exists
        const roleExist = await Role.findOne({ where: { id: Users.roleId } });
        if (!roleExist) {
            return res.status(400).json({ error: "Role does not exist" });
        }

        // Assign role to user
        await UserRole.create({
            userId: newUser.id,
            roleId: Users.roleId,
        });

        // Fetch roles by role IDs
        const userRoles = await UserRole.findAll({ where: { userId: newUser.id } });
        const roleIds = userRoles.map(userRole => userRole.roleId);

        const roles = await Role.findAll({
            where: {
                id: roleIds
            },
            attributes: ['id', 'name'] // Include specific attributes if needed
        });

        // Construct the response object with user details and roles
        const userData = {
            ...newUser.toJSON(),
            organization: organization.toJSON(), // Convert organization instance to JSON
            roles: roles.map(role => ({
                id: role.id,
                name: role.name
            }))
        };

        res.status(201).json({ message: 'User created successfully', data: userData });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message });
    }
};
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch user roles with associated role details
        const userRoles = await UserRole.findAll({ where: { userId: id } });
        log.Info("@@userRole   " + JSON.stringify(userRoles));

        // If no user roles found, return 404
        if (!userRoles || userRoles.length === 0) {
            return res.status(404).json({ error: 'User roles not found' });
        }

        // Extract role IDs from userRoles
        const roleIds = userRoles.map(userRole => userRole.roleId);

        // Fetch user details including organization
        const user = await UserModel.findByPk(id, {
            include: [
                {
                    model: OrganizationModel,
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

        res.status(200).json({ message: 'User found', data: userData });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: error.message });
    }
};
const deleteById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by ID
        const user = await UserModel.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find all user roles associated with the user
        const userRoles = await UserRole.findAll({ where: { userId: id } });

        if (userRoles && userRoles.length > 0) {
            // Delete all user roles associated with the user
            await UserRole.destroy({ where: { userId: id } });
        }

        // Check if the organization is only associated with this user
        const organizationId = user.organizationId;
        const usersInSameOrganization = await UserModel.findAll({ where: { organizationId } });

        // Delete the user
        await user.destroy();

        // Delete the organization if no other users are associated with it
        if (usersInSameOrganization.length === 1) {
            await OrganizationModel.destroy({ where: { id: organizationId } });
        }

        res.status(200).json({ message: 'User and associated roles deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: error.message });
    }
};
const getAll = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            include: [
                {
                    model: OrganizationModel,
                    as: 'organization',
                    attributes: ['id', 'organizationName', 'email']
                },
                {
                    model: UserRole,
                    include: [
                        {
                            model: Role,
                            as: 'role',
                            attributes: ['id', 'name']
                        }
                    ],
                    attributes: []
                }
            ]
        });

        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        const userData = users.map(user => ({
            id: user.id,
            userName: user.userName,
            organization: user.organization,
            roles: user.user_roles.map(userRole => ({
                id: userRole.role.id,
                name: userRole.role.name
            }))
        }));

        res.status(200).json({ message: 'Users retrieved successfully', data: userData });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: error.message });
    }
};
const deleteMultiple = async (req, res) => {
    const { userIds } = req.body; // Expect an array of user IDs in the request body

    try {
        // Find all users by the given IDs
        const users = await UserModel.findAll({ where: { id: userIds } });

        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'Users not found' });
        }

        // Delete user roles associated with the users
        await UserRole.destroy({ where: { userId: userIds } });

        // Collect organization IDs to check for deletions
        const organizationIds = users.map(user => user.organizationId);

        // Delete the users
        await UserModel.destroy({ where: { id: userIds } });

        // Check if any organizations should be deleted
        for (const organizationId of organizationIds) {
            const usersInSameOrganization = await UserModel.findAll({ where: { organizationId } });
            if (usersInSameOrganization.length === 0) {
                await OrganizationModel.destroy({ where: { id: organizationId } });
            }
        }

        res.status(200).json({ message: 'Selected users and their associated roles deleted successfully' });
    } catch (error) {
        console.error("Error deleting users:", error);
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createUpdate, getUserById,deleteById,getAll,deleteMultiple
};
