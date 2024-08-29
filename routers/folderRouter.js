import { Router } from "express";
const folderRouter = Router();

import folderController from "../controllers/folderController.js";

folderRouter.post("/upload-folder", folderController.create_folder_post);
folderRouter.post("/:id/delete-folder", folderController.delete_folder_post);
folderRouter.post("/:id/delete-folder", folderController.delete_folder_post);

export default folderRouter;
