import { Router } from "express";
const authRouter = Router();

import authController from "../controllers/authController.js";

authRouter.get("/login", authController.login_get);
authRouter.post("/login", authController.login_post);

authRouter.get("/sign-up", authController.sign_up_get);
authRouter.post("/sign-up", authController.sign_up_post);

export default authRouter;
