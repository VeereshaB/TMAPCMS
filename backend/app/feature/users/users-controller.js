// users-router.js
const express = require("express");
const router = express.Router();
const authMiddleware = require('../../authentication/jwt-authMiddleware'); // Adjust path as necessary
const Users = require('./user-implementaion'); // Adjust path as necessary
// authMiddleware.authMiddleware,
router.post("/create", Users.createUpdate);

module.exports = router;
