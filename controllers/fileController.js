import asyncHandler from "express-async-handler";

const fileController = {
  // Handle uploading a file
  upload_file_post: asyncHandler(async (req, res) => {
    if (req.isAuthenticated()) {
      res.send("File upload successfully!");
    } else {
      res.status(403).send("You must be logged in to upload files");
    }

    console.log(req.file, req.body);
  }),

  // Handle creating a file
  edit_file_post: asyncHandler(async (req, res) => {
    // TODO
  }),

  // Handle deleting a file
  delete_file_post: asyncHandler(async (req, res) => {
    // TODO
  }),
};

export default fileController;
