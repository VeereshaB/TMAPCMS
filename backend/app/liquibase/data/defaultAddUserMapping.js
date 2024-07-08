const { constantRoleList, defaultAdminUser, defaultOrganization } = require('./constant');
const Role = require('../../../app/feature/roles/models/roles.model');
const User = require('../../../app/feature/users/models/UserModel');
const Organization = require('../../../app/feature/users/models/OrganizationModel');
const UserRole = require('../../../app/feature/roles/models/user-role.model'); // Assuming you have a UserRole model
const bcrypt = require('bcrypt');

// Function to create default roles
const createDefaultRoles = async () => {
    try {
        for (const roleName of constantRoleList) {
            const role = await Role.findOne({ where: { name: roleName } });
            if (!role) {
                await Role.create({ name: roleName });
                console.log(`Role ${roleName} created.`);
            } else {
                console.log(`Role ${roleName} already exists.`);
            }
        }
        console.log('All default roles have been checked and created if necessary.');
    } catch (error) {
        console.error('Error creating default roles:', error);
    }
};

// Function to create the default organization
const createDefaultOrganization = async () => {
    try {
        const organization = await Organization.findOne({ where: { organizationName: defaultOrganization.organizationName } });
        if (!organization) {
            await Organization.create(defaultOrganization);
            console.log('Default organization created successfully');
        } else {
            console.log('Default organization already exists');
        }
    } catch (error) {
        console.error('Error creating default organization:', error);
    }
};

// Function to create the default admin user
const createDefaultAdminUser = async () => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(defaultAdminUser.password, salt);

        const [defaultUser, created] = await User.findOrCreate({
            where: { userName: defaultAdminUser.userName }, // Ensure uniqueness by email
            defaults: {
                ...defaultAdminUser,
                password: hashedPassword,
                organizationId: 1, // Assuming organizationId for default organization
            },
        });

        if (created) {
            console.log('Default admin user created successfully');
        } else {
            console.log('Default admin user already exists');
        }

        const adminRole = await Role.findOne({ where: { name: 'Founder' } }); // Adjust role name as per your needs
        if (adminRole) {
            const userRole = await UserRole.findOne({
                where: {
                    userId: defaultUser.id,
                    roleId: adminRole.id,
                },
            });

            if (!userRole) {
                await UserRole.create({
                    userId: defaultUser.id,
                    roleId: adminRole.id,
                });
                console.log('Default user-role association created successfully');
            } else {
                console.log('Default user-role association already exists');
            }
        } else {
            console.error('Admin role not found');
        }
    } catch (error) {
        console.error('Error creating default admin user:', error);
    }
};

// Execute all functions sequentially
const initializeDatabase = async () => {
    try {
        await createDefaultRoles();
        await createDefaultOrganization();
        await createDefaultAdminUser();
    } catch (error) {
        console.error('Initialization error:', error);
    } finally {
        // Close database connections or perform cleanup if needed
        console.log('Initialization process completed.');
    }
};

initializeDatabase();
