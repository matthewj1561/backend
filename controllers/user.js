const dbo = require("../db/conn");

// This section will help you update a document by id.
// router.route("/profile").get(function (req, res) {
//     const dbConnect = dbo.getDb();
//     const query = { email: req.body.email };

//     let users = dbConnect.collection("Users");

//     users.findOne(query, (err, result) => {
//       if (err) {
//         console.log("bad hit");
//         res.status(400).send(`Error finding user with email ${query.email}!`);
//       } else {
//         res.json(result);
//         console.log(req.body.email);
//       }
//     });
//   });

module.exports.AddUser = async (req, res) => {
  try {
    const result = await dbo
      .getDb()
      .collection("Users")
      .find({ email: req.body.email });
    const user = await result.toArray();
    console.log(req.body.email);
    if (user.length) {
      // acknowledge and return nothing
      res.status(200).json(result);
    } else {
      // create new user
      const user = {
        email: req.body.email,
        family_name: req.body.familyName,
        given_name: req.body.givenName,
        picture: req.body.picture,
      };
      const result = await dbo.getDb().collection("Users").insertOne(user);
      res.status(201);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const result = await dbo
      .getDb()
      .collection("Users")
      .find({ email: req.query.email });
    result
      .toArray()
      .then((list) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(list[0]);
      })

      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.addName = async (req, res) => {
  const givenEmail = req.body.email;
  const first = req.body.first;
  const last = req.body.last;

  query = { email: givenEmail };
  action = { $set: { given_name: first, family_name: last } };

  const result = await dbo.getDb().collection("Users").updateOne(query, action);

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while liking the post.");
  }
};

module.exports.addLocation = async (req, res) => {
  const givenEmail = req.body.email;
  const city = req.body.city;
  const state = req.body.state;

  query = { email: givenEmail };
  action = { $set: { city: city, state: state } };

  const result = await dbo.getDb().collection("Users").updateOne(query, action);

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while liking the post.");
  }
};
