import { Router } from "express";
const folderRouter = Router();

import folderController from "../controllers/folderController.js";

folderRouter.get("/:id", folderController.display_folder_get);

folderRouter.post("/create-folder", folderController.create_folder_post);
folderRouter.post("/:id/edit-folder", folderController.edit_folder_post);
folderRouter.post("/:id/delete-folder", folderController.delete_folder_post);

export default folderRouter;
