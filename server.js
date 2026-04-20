const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SiyaClip Backend Running 🚀");
});

app.post("/generate", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Video link required"
    });
  }

  res.json({
    success: true,
    message: "Processing Started 🚀",
    input: url,
    shorts: [
      "short1.mp4",
      "short2.mp4",
      "short3.mp4"
    ]
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
