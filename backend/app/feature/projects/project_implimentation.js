const Organization = require("../users/models/OrganizationModel");
const User = require("../users/models/UserModel");
const Projects = require("./ProjectModel");


// List all projects
async function listAll(req, res) {
    try {
        const projects = await Projects.findAll({
            include: [
                { model: Organization, as: 'organization' },
                { model: User, as: 'user' }
            ]
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get project details by ID
async function detail(req, res) {
    const { id } = req.params;
    try {
        const project = await Projects.findByPk(id, {
            include: [
                { model: Organization, as: 'organization' },
                { model: User, as: 'user' }
            ]
        });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add a new project
async function add(req, res) {
    const { name, organizationId, userId, status ,createdBy} = req.body;
    try {
        const newProject = await Projects.create({
            name,
            organizationId,
            userId,
            status,
            createdBy
        });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an existing project
async function update(req, res) {
    const { id } = req.params;
    const { name, organizationId, userId, status } = req.body;
    try {
        const project = await Projects.findByPk(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        project.name = name;
        project.organizationId = organizationId;
        project.userId = userId;
        project.status = status;
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a project
async function del(req, res) {
    const { id } = req.params;
    try {
        const project = await Projects.findByPk(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        await project.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// List projects with some filter or condition (example placeholder, modify as needed)
async function list(req, res) {
    const { userId } = req.query; // Example filter condition
    try {
        const projects = await Projects.findAll({
            where: userId ? { userId } : {},
            include: [
                { model: Organization, as: 'organization' },
                { model: User, as: 'user' }
            ]
        });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    list,
    listAll,
    detail,
    add,
    update,
    del
};
