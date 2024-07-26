const AutomationReport = require("./Automation-ReportModel");

// List all automation reports
const listAll = async (req, res) => {
    try {
        const reports = await AutomationReport.findAll({
            include: ['project'] // Include related project information
        });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get details of a specific automation report by ID
const detail = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await AutomationReport.findByPk(id, {
            include: ['project']
        });

        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new automation report
const add = async (req, res) => {
    try {
        const {
            name,
            totalPassedCount,
            totalFailedCount,
            totalBreakedCount,
            totalTestCases,
            notExecuteTestCases,
            executedTestCases,
            projectId,
            models,
            status,
            createdBy
        } = req.body;
        console.log(JSON.stringify(req.body));

        const newReport = await AutomationReport.create({
            name,
            totalPassedCount,
            totalFailedCount,
            totalBreakedCount,
            totalTestCases,
            notExecuteTestCases,
            executedTestCases,
            projectId,
            models,
            status,
            createdBy,
            createdDate: new Date()
        });

        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing automation report by ID
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            totalPassedCount,
            totalFailedCount,
            totalBreakedCount,
            totalTestCases,
            notExecuteTestCases,
            executedTestCases,
            projectId,
            models,
            status,
            lastModifiedBy
        } = req.body;

        const report = await AutomationReport.findByPk(id);

        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }

        const updatedReport = await report.update({
            name,
            totalPassedCount,
            totalFailedCount,
            totalBreakedCount,
            totalTestCases,
            notExecuteTestCases,
            executedTestCases,
            projectId,
            models,
            status,
            lastModifiedBy,
            lastModifiedDate: new Date()
        });

        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an automation report by ID
const del = async (req, res) => {
    try {
        const { id } = req.params;

        const report = await AutomationReport.findByPk(id);

        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }

        await report.destroy();

        res.status(200).json({ message: 'Report successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listAll,
    detail,
    add,
    update,
    del
};
