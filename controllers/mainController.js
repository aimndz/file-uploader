import asyncHandler from "express-async-handler";

const mainController = {
  // Handle diplaying index
  index: asyncHandler(async (req, res) => {
    res.send("Index page");
  }),

  // Handle diplaying home
  home_get: asyncHandler(async (req, res) => {
    res.send("Home page");
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
