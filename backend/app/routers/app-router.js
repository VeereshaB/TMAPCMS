// app-router.js
const express = require("express");
const router = express.Router();
const authenticateRouter = require('../authentication/authentication-controller'); // Adjust path as necessary
const usersRouter = require('../feature/users/users-controller'); // Adjust path as necessary
const rolesRouter = require('../feature/roles/role-controller')
const projectController=require('../feature/projects/project_controller')
const AutomationController=require('../feature/automation/automation-controller');
const employeeController=require('../feature/employees/employeesController')
router.use('/authenticate', authenticateRouter);
router.use('/users', usersRouter);
router.use('/roles', rolesRouter);
router.use('/projects', projectController);
router.use('/automation', AutomationController);
router.use('/employee', employeeController);
module.exports = router;
