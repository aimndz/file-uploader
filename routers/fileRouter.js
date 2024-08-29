import { Router } from "express";
const fileRouter = Router();

import fileController from "../controllers/fileController.js";

fileRouter.post("/upload-file", fileController.upload_file_post);
fileRouter.post("/:id/delete-file", fileController.delete_file_post);
fileRouter.post("/:id/delete-file", fileController.delete_file_post);

export default fileRouter;
