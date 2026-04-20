const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SiyaClip Real Backend Running 🚀");
});

function getVideoId(url) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

app.post("/generate", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "YouTube URL required"
      });
    }

    const videoId = getVideoId(url);

    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube Link"
      });
    }

    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return res.json({
      success: true,
      title: "YouTube Video Detected",
      thumbnail: thumbnail,
      views: "Live Views",
      duration: "Available",
      videoId: videoId,
      shorts: [
        { name: "Short 1 Ready", download: "#" },
        { name: "Short 2 Ready", download: "#" },
        { name: "Short 3 Ready", download: "#" }
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
