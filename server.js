const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const uri = `mongodb+srv://tyrellc:${process.env.MONGO_PASSWORD}@entertainmentapp.jtcf92n.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
}

mongoose.set("strictQuery", false);

connect();

app.listen(8000, () => {
  console.log("Express Server Started port:8000");
});

const collectionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  thumbnail: {
    trending: {
      small: { type: String, required: true },
      large: { type: String, required: true },
    },
    regular: {
      small: { type: String, required: true },
      medium: { type: String, required: true },
      large: { type: String, required: true },
    },
  },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: String, required: true },
  isBookmarked: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: true },
});

const Collection = mongoose.model("Collection", collectionSchema, "media");

app.get("/data", async (req, res) => {
  const data = await Collection.find();
  res.json(data);
});
