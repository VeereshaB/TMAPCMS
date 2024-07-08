const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) => {
    res.send("Welcome to the notification setting route Users!");
  });
// Export the router
module.exports = router;