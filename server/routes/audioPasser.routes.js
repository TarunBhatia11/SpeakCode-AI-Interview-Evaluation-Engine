import express from "express";
import multer from "multer";
import { spawn } from "child_process";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".webm");
  }
});

const upload = multer({ storage });

router.post("/analyze", upload.single("audio"), async (req, res) => {
  try {
    const audioPath = req.file.path;

    const pythonProcess = spawn("python", [
      "python/speech_to_text.py",
      audioPath
    ]);

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    pythonProcess.on("close", () => {
      res.json({
        success: true,
        transcript: result.trim()
      });
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;