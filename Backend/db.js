const mongoose = require("mongoose");
require('dotenv').config();


const mongourl =process.env.MONGO_URL;


const mongodb = async () => {
  try {
    await mongoose.connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function (err, data) {
      const foodCategory = await mongoose.connection.db.collection(
        "food_category"
      );
      foodCategory.find({}).toArray(function (err, catData) {
        if (err) {
          console.log(err);
        } else {
          global.food_items = data;
          global.food_category = catData;
          
        }
      });
      // if (err) {
      //     console.log(err);
      // } else {
      //     global.food_items=data;
      //     // console.log(global.food_items);
      // }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongodb;
