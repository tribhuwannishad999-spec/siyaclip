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

    const command = `python3 -m yt_dlp --dump-json "${url}"`;

    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "yt-dlp fetch error",
          error: stderr || error.message
        });
      }

      try {
        const data = JSON.parse(stdout);

        return res.json({
          success: true,
          message: "Video Loaded Successfully 🚀",
          title: data.title || "Untitled Video",
          thumbnail: data.thumbnail || "",
          duration: data.duration || 0,
          views: data.view_count || 0,
          shorts: [
            "Short 1 Ready",
            "Short 2 Ready",
            "Short 3 Ready"
          ]
        });

      } catch (jsonError) {
        return res.status(500).json({
          success: false,
          message: "JSON parse error"
        });
      }
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
