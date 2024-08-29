import asyncHandler from "express-async-handler";

const fileController = {
  // Handle uploading a file
  upload_file_post: asyncHandler(async (req, res) => {
    // TODO
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
