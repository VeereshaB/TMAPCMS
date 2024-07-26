
var express = require("express");
var router = express.Router();
const projectIMpl = require("./project_implimentation");
// const {authMiddleware}=require('../app/src/auth/authMiddleware')

router.post("/", projectIMpl.list);
router.get("/all", projectIMpl.listAll);
/**
 * Get a projectIMpl details
 */
router.get("/:id", projectIMpl.detail);
// Add new role
router.post(
  "/create",
  projectIMpl.add
);
// Update a role
router.post(
  "/update/:id",
  projectIMpl.update
);
// Delete a user
router.delete(
  "/:id",
  projectIMpl.del
);
module.exports = router;

