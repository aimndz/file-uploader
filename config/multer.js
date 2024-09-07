import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB Max file size
  fileFilter: (req, file, done) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
      return done(new Error("Invalid file type"), false);
    }
    done(null, true);
  },
});

export default upload;
