const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SiyaClip Real Backend Running 🚀");
});

app.post("/generate", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "YouTube link required"
      });
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube link"
      });
    }

    const info = await ytdl.getInfo(url);

    const title = info.videoDetails.title;
    const thumbnail = info.videoDetails.thumbnails.pop().url;
    const length = info.videoDetails.lengthSeconds;
    const views = info.videoDetails.viewCount;

    return res.json({
      success: true,
      message: "Real Video Data Loaded 🚀",
      title: title,
      thumbnail: thumbnail,
      duration: length,
      views: views,
      shorts: [
        "Short 1 Ready",
        "Short 2 Ready",
        "Short 3 Ready"
      ]
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Processing Error"
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("SiyaClip Running on Port " + PORT);
});
