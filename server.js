const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SiyaClip Backend Running 🚀");
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

    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      return res.status(400).json({
        success: false,
        message: "Only YouTube links allowed"
      });
    }

    let videoId = "";

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    }

    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return res.json({
      success: true,
      message: "Video Ready For Processing 🚀",
      title: "YouTube Video Detected",
      thumbnail: thumbnail,
      videoId: videoId,
      shorts: [
        "Short 1 Ready",
        "Short 2 Ready",
        "Short 3 Ready"
      ]
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("SiyaClip Server Running on " + PORT);
});
