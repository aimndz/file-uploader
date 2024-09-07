import { Router } from "express";
const mainRouter = Router();

// Middlewares
import ensureAuthenticated from "../middlewares/isLogin.js";
import setHomeData from "../middlewares/setHomeData.js";

// Controllers
import mainController from "../controllers/mainController.js";

mainRouter.get("/", setHomeData, mainController.index);
mainRouter.get(
  "/home",
  ensureAuthenticated,
  setHomeData,
  mainController.home_get
);

mainRouter.post("/:id/share", ensureAuthenticated, mainController.share_post);
mainRouter.post(
  "/:id/download",
  ensureAuthenticated,
  mainController.download_post
);

mainRouter.get("/logout", ensureAuthenticated, mainController.logout_get);

export default mainRouter;
