import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// use express.Handler to let Express handle the return type
router.post(
  "/",
  upload.single("file"),
  (async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = `https://api.shahdhairya.in/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  }) as express.Handler // force the handler to match Express expectations
);


export default router;
