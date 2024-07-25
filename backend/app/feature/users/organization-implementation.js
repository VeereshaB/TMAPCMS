const OrganizationModel = require('./models/OrganizationModel');
const log = require('../../database-connection//logfile'); // Adjust the path as needed

// Create or update an organization
const createUpdate = async (req, res) => {
  try {
    const { id, name, email, address } = req.body;

    let organization;
    if (id) {
      organization = await OrganizationModel.findByPk(id);
      if (organization) {
        organization.name = name;
        organization.email = email;
        organization.address = address;
        // Update other fields as needed
        await organization.save();
      } else {
        return res.status(404).json({ message: 'Organization not found' });
      }
    } else {
      organization = await OrganizationModel.create({ name, email, address });
      // Create other fields as needed
    }

    res.status(200).json({ message: 'Organization saved successfully', data: organization });
  } catch (error) {
    console.error("Error saving organization:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get organization by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await OrganizationModel.findByPk(id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json({ message: 'Organization found', data: organization });
  } catch (error) {
    console.error("Error fetching organization:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete organization by ID
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await OrganizationModel.findByPk(id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    await organization.destroy();
    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.error("Error deleting organization:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all organizations
const getAllOrganization = async (req, res) => {
  try {
    const organizations = await OrganizationModel.findAll();
    res.status(200).json({ message: 'Organizations found', data: organizations });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete multiple organizations
const deleteMultiple = async (req, res) => {
  try {
    const { ids } = req.body; // Assume ids is an array of organization IDs
    await OrganizationModel.destroy({ where: { id: ids } });
    res.status(200).json({ message: 'Organizations deleted successfully' });
  } catch (error) {
    console.error("Error deleting organizations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUpdate,
  getUserById,
  deleteById,
  getAllOrganization,
  deleteMultiple
};
