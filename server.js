const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const uri = `${process.env.MONGODB_URI}`;

async function connect() {
  try {
    await mongoose.connect(uri);
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
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid ID" });
    return;
  }
  try {
    const data = await Collection.findOne({ _id: id });
    if (!data) {
      res.status(404).json({ message: "Data not found" });
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
    const data = await Collection.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});
app.post("/api/ai", async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const generatedText = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-0125",
        messages: [
          {
            role: "system",
            content:
              "You are creating a short and exciting movie trailer. You are outputting only sentences.",
          },
          {
            role: "user",
            content: `Create a short movie trailer script for the movie titled: ${prompt}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const voices = ["onyx", "alloy", "echo", "fable", "nova", "shimmer"];
    const audioResponse = await axios.post(
      "https://api.openai.com/v1/audio/speech",
      {
        model: "tts-1",
        input: `${generatedText.data.choices[0].message.content}`,
        voice: voices[Math.floor(Math.random() * voices.length)],
        response_format: "mp3",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        responseType: "arraybuffer",
      }
    );
    res.send(audioResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating image" });
  }
});

module.exports = app;
