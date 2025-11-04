const express = require("express");
const router = express.Router();
const areaController = require("../controllers/area");

router.get("/getallareas", areaController.getAreas);
router.post("/addarea", areaController.postArea);
router.put("/postsurvey", areaController.addSurvey);
router.get("/getonearea", areaController.getOneArea);
router.get("/getUserLocation", areaController.getUserLocation);

module.exports = router;
