const express = require("express");
const router = express.Router();
const gigpostsController = require("../controllers/gigposts");

router.get("/", gigpostsController.getAll);
router.get("/getlikes", gigpostsController.getLikes);
router.get("/getcomments", gigpostsController.getComments);
router.get("/getbylocation", gigpostsController.getByLocation);
router.post("/add", gigpostsController.createPost);
router.put("/addcomment", gigpostsController.addComment);
router.put("/addlike", gigpostsController.addLike);

module.exports = router;
