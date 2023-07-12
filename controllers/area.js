const dbo = require("../db/conn");

module.exports.postArea = async (req, res) => {
  const existingDoc = await dbo
    .getDb()
    .collection("Areas")
    .findOne({ areaCity: req.body.city, areaState: req.body.state });

  if (existingDoc == null) {
    // res.status(201).json(existingDoc);
    try {
      const newArea = {
        areaCity: req.body.city,
        areaState: req.body.state,
        areaData: {
          pay: {
            eightFifty: 0,
            tenToFifteen: 0,
            fifteenToTwenty: 0,
            twentyToThirty: 0,
            thirtyPlus: 0,
          },

          expenses: {
            lessThanTwenty: 0,
            TwentytoSixty: 0,
            sixtyToOneTwenty: 0,
            OneTwentyToTwoFifty: 0,
            TwoFiftyPlus: 0,
          },

          hotSpots: [],
          demand: {
            morning: 0,
            noon: 0,
            afternoon: 0,
            evening: 0,
            night: 0,
          },

          Tips: [],
        },
      };
      const result = await dbo.getDb().collection("Areas").insertOne(newArea);
    } catch (error) {
      res.status(500).json(error || "Couldn't post Area.");
    }
  } else {
    res.status(304).json(existingDoc.error || "Area already Exists");
  }
};

module.exports.addSurvey = async (req, res) => {
  const city = req.body.city;
  const state = req.body.state;

  const pay = req.body.pay;
  const cost = req.body.cost;
  const hotspotValues = req.body.hotspotValues;
  const demand = req.body.demand;
  const tips = req.body.tips;

  query = { areaCity: city, areaState: state };
  action = {
    $inc: {
      ["areaData.pay." + pay]: 1,
      ["areaData.expenses." + cost]: 1,
      ["areaData.demand." + demand]: 1,
    },
    $push: {
      ["areaData.hotSpots"]: { $each: hotspotValues },
      ["areaData.Tips"]: tips,
    },
  };

  const result = await dbo.getDb().collection("Areas").updateOne(query, action);
  // console.log(result);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while posting the survey.");
  }
};

module.exports.getOneArea = async (req, res) => {
  try {
    const result = await dbo
      .getDb()
      .collection("Areas")
      .find({ areaCity: req.query.city, areaState: req.query.state });
    result
      .toArray()
      .then((list) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(list[0]);
      })

      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the area.",
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getAreas = async (req, res) => {
  try {
    const result = await dbo.getDb().collection("Areas").find();
    result
      .toArray()
      .then((list) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(list);
      })

      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving areas.",
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};
// {
//   areaCity: req.body.city,
//   areaState: req.body.state,
//   areaData: {
//     pay: {
//       "<8.50": 0,
//       "10-15": 0,
//       "15-20": 0,
//       "20-30": 0,
//     },
//     expenses: {
//       "<20": 0,
//       "20-60": 0,
//       "60-120": 0,
//       "120-250": 0,
//       "250+": 0,
//     },
//     hotSpots: [],
//     demand: {
//       morning: 0,
//       afternoon: 0,
//       evening: 0,
//       night: 0,
//     },
//     Tips: [],
//   },
// };
