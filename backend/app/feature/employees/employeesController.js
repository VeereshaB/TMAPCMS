const express = require("express");
const router = express.Router();
const employeeImpl = require("./employeeImplements");

router.post("/", employeeImpl.list);
router.get("/all", employeeImpl.listAll);
/**
 * Get employee details
 */
router.get("/:id", employeeImpl.detail);
// Add new employee
router.post(
  "/create",
  employeeImpl.add
);
// Update an employee
router.post(
  "/update/:id",
  employeeImpl.update
);
// Delete an employee
router.delete(
  "/:id",
  employeeImpl.del
);

module.exports = router;
