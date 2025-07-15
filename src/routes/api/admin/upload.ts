import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage with correct `params` typing
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, _file) => {
    return {
      folder: "uploads",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  },
});

const upload = multer({ storage });

// Upload route
router.post(
  "/",
  upload.single("file"),
  (async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = (req.file).path;
    res.json({ url: fileUrl });
  }) as express.Handler
);

export default router;
