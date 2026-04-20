const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SiyaClip Debug Backend Running 🚀");
});

app.post("/generate", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "YouTube URL required"
    });
  }

  const command = `python -m yt_dlp --dump-json "${url}"`;

  exec(command, { maxBuffer: 1024 * 1024 * 20 }, (error, stdout, stderr) => {

    if (error) {
      return res.status(500).json({
        success: false,
        message: "DEBUG ERROR",
        error: error.message,
        stderr: stderr
      });
    }

    try {
      const data = JSON.parse(stdout);

      return res.json({
        success: true,
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

    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "JSON Parse Error",
        raw: stdout
      });
    }

  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("SiyaClip Debug Server Running on " + PORT);
});
