const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: 'https://entertainment-app-eight.vercel.app',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.use(bodyParser.json());

const uri = `${process.env.MONGODB_URI}`;

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

app.listen(process.env.PORT || 8000, () => {
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

const Collection = mongoose.model("Collection", collectionSchema, "medias");

app.get("/data", async (req, res) => {
  const data = await Collection.find();
  res.json(data);
});

app.get("/data/:id", async (req, res) => {
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Invalid ID' });
    return;
  }
  try {
    const data = await Collection.findOne({ _id: id });
    if(!data) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.json({ message: error });
  }
});

app.put("/data/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const update = req.body;
    const data = await Collection.findOneAndUpdate({ _id: id }, update, { new: true });
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = app;


