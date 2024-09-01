import { Router } from "express";
import upload from "../config/multer.js";
const fileRouter = Router();

import fileController from "../controllers/fileController.js";

fileRouter.post(
  "/upload-file",
  upload.single("file"),
  fileController.upload_file_post
);
fileRouter.post("/:id/delete-file", fileController.delete_file_post);
fileRouter.post("/:id/delete-file", fileController.delete_file_post);

export default fileRouter;
