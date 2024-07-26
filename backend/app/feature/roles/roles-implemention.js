const { paginate } = require('../../helpers/pagination');
const RoleModel = require('./models/roles.model');
const RequestHelper = require('../../helpers/requestValidatorHelper');
const list = async (req, res) => {
    console.log("@@@@@@req.body" + JSON.stringify(req.body));
    const { page, pageSize, searchString, filters = {} } = req.body;
    try {
        const result = await paginate(RoleModel, parseInt(page), parseInt(pageSize), searchString);

        res.status(200).json({
            data: result.data,
            total: result.total,
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            totalPages: Math.ceil(result.total / parseInt(pageSize))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listAll = async (req, res) => {
    console.log("@@@@@@req.body" + JSON.stringify(req.body));
    try {
        const roles = await RoleModel.findAll();

        res.status(200).json({
            data: roles
        });
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ error: error.message });
    }
};
// Get role by ID
detail = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await RoleModel.findByPk(id);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new role
const add = async (req, res) => {
    console.log(req.body);
    // Validate request body
    const { V, Valid } = await RequestHelper.validate(req.body, {
        name: "required"
    });
    if (!Valid) {
        return res.status(422).json({
            success: false,
            validation: true,
            errors: V.errors
        });
    }
    // Destructure the validated data
    const { name } = req.body;
    try {
        // Create a new role using RoleModel
        const newRole = await RoleModel.create({ name });

        // Respond with the newly created role
        res.status(201).json({ message: 'role created successfully', data: newRole });
    } catch (error) {
        // Handle errors if role creation fails
        console.error("Error creating role:", error);
        res.status(500).json({ error: error.message });
    }
};
// Delete a role by ID
del = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await RoleModel.findByPk(id);
        if (role) {
            await role.destroy();
            res.status(200).json({ message: 'Role deleted successfully' });
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        if (error) {
            res.status(500).json({ error: 'role assosiated user' });
        }
    }
};

// Update role details by ID
update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const role = await RoleModel.findByPk(id);
        if (role) {
            role.name = name;
            await role.save();
            res.status(200).json({ message: "Role Updated Successfully", data: role });
        } else {
            res.status(404).json({ error: 'role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    list,
    detail,
    add,
    del,
    update,
    listAll
};
