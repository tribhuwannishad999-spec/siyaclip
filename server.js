const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SiyaClip yt-dlp Backend Running 🚀");
});

app.post("/generate", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "YouTube URL required"
      });
    }

    const command = `yt-dlp --dump-json "${url}"`;

    exec(command, (error, stdout, stderr) => {

      if (error) {
        return res.status(500).json({
          success: false,
          message: "yt-dlp fetch error"
        });
      }

      const data = JSON.parse(stdout);

      return res.json({
        success: true,
        message: "Video Loaded Successfully 🚀",
        title: data.title,
        thumbnail: data.thumbnail,
        duration: data.duration,
        views: data.view_count,
        shorts: [
          "Short 1 Ready",
          "Short 2 Ready",
          "Short 3 Ready"
        ]
      });

    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("SiyaClip Running on Port " + PORT);
});
