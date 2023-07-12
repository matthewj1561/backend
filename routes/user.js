const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.getUser);
router.post("/adduser", userController.AddUser);
router.put("/addname", userController.addName);
router.put("/addlocation", userController.addLocation);

module.exports = router;
