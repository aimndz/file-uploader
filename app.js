import express from "express";

import mainRouter from "./routers/mainRouter.js";
import authRouter from "./routers/authRouter.js";
import fileRouter from "./routers/fileRouter.js";
import folderRouter from "./routers/folderRouter.js";

const app = express();

app.use("/", mainRouter);
app.use("/", authRouter);
app.use("/files", fileRouter);
app.use("/folders", folderRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
