const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

router.get("/", postsController.getAll);
router.get("/getlikes", postsController.getLikes);
router.get("/getcomments", postsController.getComments);
router.post("/add", postsController.createPost);
router.put("/addcomment", postsController.addComment);
router.put("/addlike", postsController.addLike);

module.exports = router;
