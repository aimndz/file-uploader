import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";

import { fileURLToPath } from "url";
import path from "path";

// Get the current file's URL and convert it to a directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

import mainRouter from "./routers/mainRouter.js";
import authRouter from "./routers/authRouter.js";
import fileRouter from "./routers/fileRouter.js";
import folderRouter from "./routers/folderRouter.js";
import passport from "./config/passport.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Initialize session and passport
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());

// Routers
app.use("/", mainRouter);
app.use("/", authRouter);
app.use("/files", fileRouter);
app.use("/folders", folderRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
