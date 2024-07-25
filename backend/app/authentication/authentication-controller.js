const express = require("express");
const router = express.Router();
const Authentication=require('./authentication-implementation')
// router.get("/", (req, res, next) => {
//     res.send("Welcome to the notification setting route aUthentication!");
//   });
  
router.post("/login", Authentication.login);
router.get("/logout", Authentication.logout);
router.get("/user", Authentication.getUser);
// Export the router
module.exports = router;