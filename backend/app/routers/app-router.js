// app-router.js
const express = require("express");
const router = express.Router();
const authenticateRouter = require('../authentication/authentication-controller'); // Adjust path as necessary
const usersRouter = require('../feature/users/users-controller'); // Adjust path as necessary

router.use('/authenticate', authenticateRouter);
router.use('/users', usersRouter);

module.exports = router;
