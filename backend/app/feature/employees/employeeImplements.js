const Organization = require("../users/models/OrganizationModel");
const Employee = require("./EmployeesModel");

// List all employees
async function listAll(req, res) {
    try {
        const employees = await Employee.findAll({
            include: [
                { model: Organization, as: 'organization' }
            ]
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get employee details by ID
async function detail(req, res) {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id, {
            include: [
                { model: Organization, as: 'organization' }
            ]
        });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add a new employee
async function add(req, res) {
    try {
        const newEmployee = await Employee.create(req.body);
        res.status(201).json({data:newEmployee,message:"Employees created Successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an existing employee
async function update(req, res) {
    const { id } = req.params;
    const { name, email, phone, position, department, organizationId, updatedBy } = req.body;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        // employee.name = name;
        // employee.email = email;
        // employee.phone = phone;
        // employee.position = position;
        // employee.department = department;
        // employee.organizationId = organizationId;
        // employee.updatedBy = updatedBy;
        employee=req.body;
        await employee.save();
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete an employee
async function del(req, res) {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        await employee.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// List employees with some filter or condition (example placeholder, modify as needed)
async function list(req, res) {
    const { organizationId } = req.query; // Example filter condition
    try {
        const employees = await Employee.findAll({
            where: organizationId ? { organizationId } : {},
            include: [
                { model: Organization, as: 'organization' }
            ]
        });
        res.status(200).json(employees);
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
