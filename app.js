import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";

import mainRouter from "./routers/mainRouter.js";
import authRouter from "./routers/authRouter.js";
import fileRouter from "./routers/fileRouter.js";
import folderRouter from "./routers/folderRouter.js";
import passport from "./config/passport.js";

const app = express();
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Initialize session and passport
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use("/", mainRouter);
app.use("/", authRouter);
app.use("/files", fileRouter);
app.use("/folders", folderRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
