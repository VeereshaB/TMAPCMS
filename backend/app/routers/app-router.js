const express = require("express");
const router = express.Router();
const log = require('../database-connection/logfile');
router.get("/", (req, res, next) => {
    log.Info(res)
    res.send("Welcome to the notification setting route!");
  });
// Export the router
module.exports = router;