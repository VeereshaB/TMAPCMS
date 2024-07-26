const express = require('express');
const router = express.Router();
const automationReportImpl = require('./automation-implement');
const  runAutomation  = require('./app/school-stg');
// List all automation reports
router.get('/all', automationReportImpl.listAll);

// Get details of a specific automation report
router.get('/:id', automationReportImpl.detail);

// Add a new automation report
router.post('/create', automationReportImpl.add);

// Update an existing automation report
router.post('/update/:id', automationReportImpl.update);

// Delete an automation report
router.delete('/:id', automationReportImpl.del);

router.post('/run', runAutomation.getRowCount);
module.exports = router;
