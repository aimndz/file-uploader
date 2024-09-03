import asyncHandler from "express-async-handler";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const prisma = new PrismaClient();

const fileController = {
  // Handle uploading a file
  upload_file_post: asyncHandler(async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }

    const { file } = req;
    const { parent_folder } = req.body;

    if (!file) {
      return res.render("home", {
        title: "Home",
        user: req.user,
        errors: [{ msg: "No file upload", path: "file_upload" }],
        inputs: req.body,
        folderId: null,
        items: [],
      });
    }

    try {
      // Check for duplicate files
      const existingFile = await prisma.file.findFirst({
        where: {
          name: file.originalname,
          userId: req.user.id,
          folderId: parent_folder || null,
        },
      });

      if (existingFile) {
        return res.status(400).render("home", {
          title: "Home",
          errors: [{ msg: "A file with the same name already exists" }],
          inputs: req.body,
        });
      }

      const filePath = `uploads/user_${req.user.id}/folder_${parent_folder}/file_${file.originalname}`;

      // Upload file to supabase
      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (uploadError) {
        throw new Error("Failed to upload");
      }
      // Get file url after uploading
      const { data: urlData, error: urlError } = supabase.storage
        .from("files")
        .getPublicUrl(filePath);

      if (urlError) {
        throw new Error("Failed to get url");
      }

      const errors = validationResult(req);

      // Handle errors
      if (!errors.isEmpty()) {
        return res.status(400).render("home", {
          title: "Home",
          errors: errors.array(),
          inputs: req.body,
        });
      }

      const fileData = {
        name: file.originalname,
        userId: req.user.id,
        size: file.size,
        url: urlData.publicUrl,
      };

      // Conditionally add parent_folder if exists
      if (parent_folder) {
        fileData.folderId = parent_folder;
      }

      // Insert the information to the database
      await prisma.file.create({
        data: fileData,
      });

      if (parent_folder) {
        res.redirect(`/folders/${parent_folder}`);
      } else {
        res.redirect("/home");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("File upload error:", error);
      res.status(500).json({ error: error.message });
    }
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
