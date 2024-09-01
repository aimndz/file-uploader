import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mainController = {
  // Handle diplaying index
  index: asyncHandler(async (req, res) => {
    res.render("index", { title: "Home page" });
  }),

  // Handle diplaying home
  home_get: asyncHandler(async (req, res) => {
    if (req.isAuthenticated()) {
      const folders = await prisma.folder.findMany({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      res.render("home", {
        title: "Home Page",
        user: req.user,
        items: folders,
      });
    } else {
      res.redirect("/login");
    }
    // console.log(res.json);
    // res.render("home", {
    //   title: "Home Page",
    //   user: req.user,
    // });
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
