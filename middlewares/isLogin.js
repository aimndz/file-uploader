import asyncHandler from "express-async-handler";

const ensureAuthenticated = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
});

export default ensureAuthenticated;
