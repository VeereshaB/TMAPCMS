const bcrypt = require('bcrypt');
const UserModel = require('./models/UserModel'); // Adjust path as necessary
const OrganizationModel = require('./models/OrganizationModel'); // Adjust path as necessary
const Role = require('../roles/models/roles.model'); // Adjust path as necessary
const UserRole = require('../roles/models/user-role.model'); // Adjust path as necessary

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
            organizationId: organization.id // Assign organization ID to user
        });

        // Check if role exists
        const roleExist = await Role.findOne({ where: { id: Users.roleId } });
        if (!roleExist) {
            return res.status(400).json({ error: "Role does not exist" });
        }

        // Assign role to user
        const userRole = await UserRole.create({
            userId: newUser.id,
            roleId: Users.roleId,
        });

        res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUpdate,
};
