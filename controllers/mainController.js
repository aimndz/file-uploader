import asyncHandler from "express-async-handler";

const mainController = {
  // Handle diplaying index
  index: asyncHandler(async (req, res) => {
    res.render("index", { title: "Home page" });
  }),

  // Handle diplaying home
  home_get: asyncHandler(async (req, res) => {
    // Redirect back if not logged in
    if (!req.user) {
      res.redirect("/login");
    }

    res.render("home", { title: "Home" });
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
    // TODO
  }),
};

export default mainController;
