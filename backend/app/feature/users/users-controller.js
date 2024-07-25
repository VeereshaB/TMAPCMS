// users-router.js
const express = require("express");
const router = express.Router();
const authMiddleware = require('../../authentication/jwt-authMiddleware'); // Adjust path as necessary
const Users = require('./user-implementaion'); // Adjust path as necessary
const OrganizationIMPL=require('./organization-implementation')
/* organization apis start */
router.get('/organization',OrganizationIMPL.getAllOrganization)
/* organization apis end */


// authMiddleware.authMiddleware,
router.post("/create", Users.createUpdate);
router.get("/:id", Users.getUserById);
router.get("/:id", Users.getUserById);
router.get("/all", Users.getAll);
router.delete("/delete-all", Users.deleteMultiple);



module.exports = router;
