import { Router } from "express";
const folderRouter = Router();

// Middlewares
import ensureAuthenticated from "../middlewares/isLogin.js";
import setHomeData from "../middlewares/setHomeData.js";

// Controllers
import folderController from "../controllers/folderController.js";

folderRouter.get("/:id", setHomeData, folderController.display_folder_get);

folderRouter.post(
  "/create-folder",
  ensureAuthenticated,
  setHomeData,
  folderController.create_folder_post
);

folderRouter.post(
  "/:id/edit-folder",
  ensureAuthenticated,
  folderController.edit_folder_post
);

folderRouter.post(
  "/:id/delete-folder",
  ensureAuthenticated,
  folderController.delete_folder_post
);

export default folderRouter;
