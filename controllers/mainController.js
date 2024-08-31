import asyncHandler from "express-async-handler";

const mainController = {
  // Handle diplaying index
  index: asyncHandler(async (req, res) => {
    res.render("index", { title: "Home page" });
  }),

  // Handle diplaying home
  home_get: asyncHandler(async (req, res) => {
    if (req.isAuthenticated()) {
      res.render("home", { title: "home" });
    } else {
      res.redirect("/login");
    }
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
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }),
};

export default mainController;
