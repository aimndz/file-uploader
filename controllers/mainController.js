import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mainController = {
  // Handle diplaying index
  index: asyncHandler(async (req, res) => {
    res.render("index", { title: "Aim Cloud | Upload, Share, and Manage" });
  }),

  // Handle diplaying home
  home_get: asyncHandler(async (req, res) => {
    res.render("home");
  }),

  // Handle creating a folder
  share_post: asyncHandler(async (req, res) => {
    // TODO
  }),

  // Handle creating a folder
  download_post: asyncHandler(async (req, res) => {
    // TODO
  }),

  // Handle logout
  logout_get: asyncHandler(async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Failed to log out");
      }

      res.clearCookie("connect.sid");
      res.redirect("/login");
    });
  }),
};

export default mainController;
