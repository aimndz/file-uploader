import asyncHandler from "express-async-handler";

const authController = {
  // Handle login get
  login_get: asyncHandler(async (req, res) => {
    res.send("login");
  }),

  // Handle login post
  login_post: asyncHandler(async (req, res) => {
    // TODO
  }),

  // Handle sign up get
  sign_up_get: asyncHandler(async (req, res) => {
    res.send("sign up");
  }),

  // Handle sign up post
  sign_up_post: asyncHandler(async (req, res) => {
    // TODO
  }),
};

export default authController;
