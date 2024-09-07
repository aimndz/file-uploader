import { Router } from "express";
import upload from "../config/multer.js";
const fileRouter = Router();

// Middlewares
import ensureAuthenticated from "../middlewares/isLogin.js";

// Controllers
import fileController from "../controllers/fileController.js";

fileRouter.post(
  "/upload-file",
  ensureAuthenticated,
  upload.single("file"),
  fileController.upload_file_post
);
fileRouter.post(
  "/:id/edit-file",
  ensureAuthenticated,
  fileController.edit_file_post
);
fileRouter.post(
  "/:id/delete-file",
  ensureAuthenticated,
  fileController.delete_file_post
);

export default fileRouter;
