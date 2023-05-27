const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/posts", require("./posts"));
router.use("/area", require("./area"));
router.use("/gigposts", require("./gigposts"));

module.exports = router;
