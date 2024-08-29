import { Router } from "express";
const mainRouter = Router();

import mainController from "../controllers/mainController.js";

mainRouter.get("/", mainController.index);
mainRouter.get("/home", mainController.home_get);

mainRouter.post("/:id/share", mainController.share_post);
mainRouter.post("/:id/download", mainController.download_post);

mainRouter.get("/logout", mainController.logout_get);

export default mainRouter;
