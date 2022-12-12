const { ObjectId } = require("mongodb");
const dbo = require("../db/conn");

module.exports.getAll = async (req, res) => {
  try {
    const result = await dbo.getDb().collection("Posts").find();
    result
      .toArray()
      .then((list) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(list);
      })

      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Posts.",
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.createPost = async (req, res) => {
  // #swagger.tags = ['Journal']
  const post = {
    userEmail: req.body.userEmail,
    date: req.body.date,
    body: req.body.body,
    comments: req.body.comments,
    likes: req.body.likes,
  };
  const result = await dbo.getDb().collection("Posts").insertOne(post);

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while creating the Post.");
  }
};

module.exports.addComment = async (req, res) => {
  const comment = {
    postId: req.body.postId,
    userEmail: req.body.userEmail,
    date: req.body.date,
    body: req.body.body,
  };

  query = { _id: ObjectId(comment.postId) };
  action = { $push: { comments: comment } };

  const result = await dbo.getDb().collection("Posts").updateOne(query, action);

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while creating the comment.");
  }
};

module.exports.addLike = async (req, res) => {
  const postId = req.body.postId;

  query = { _id: ObjectId(postId) };
  action = { $inc: { likes: 1 } };

  const result = await dbo.getDb().collection("Posts").updateOne(query, action);

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while liking the post.");
  }
};

module.exports.getLikes = async (req, res) => {
  try {
    const result = await dbo
      .getDb()
      .collection("Posts")
      .find({ _id: ObjectId(req.query.id) });
    result
      .toArray()
      .then((list) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(list[0].likes);
      })

      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the likes.",
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getComments = async (req, res) => {
  try {
    const result = await dbo
      .getDb()
      .collection("Posts")
      .find({ _id: ObjectId(req.query.id) });

    result
      .toArray()
      .then((list) => {
        console.log(list);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(list[0].comments);
      })

      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the comments.",
        });
      });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
