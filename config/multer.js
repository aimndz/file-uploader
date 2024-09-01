import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "/tmp/my-uploads");
  },
  filename: (req, file, done) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    done(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

export default upload;
