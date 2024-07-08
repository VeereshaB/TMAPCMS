const express = require("express");
const router = express.Router();
const userController=require('../feature/users/users-controller')
const authenticate=require('../authentication/authentication-controller')
router.get("/", (req, res, next) => {
    res.send("Welcome to the notification setting route!");
  });
  router.use('/users',userController)
  router.use('/authenticate',authenticate)
// Export the router
module.exports = router;