import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const folderController = {
  display_folder_get: asyncHandler(async (req, res) => {
    res.render("home");
  }),

  // Handle creating a folder
  create_folder_post: [
    body("folder_name")
      .trim()
      .notEmpty()
      .withMessage("Name should not be empty.")
      .isLength({ max: 35 })
      .withMessage("Name exceeds 35 characters.")
      .matches(/^[a-zA-Z0-9\s!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?`~\-]+$/)
      .withMessage("Invalid input")
      .custom(async (folder_name, { req }) => {
        const existingFolder = await prisma.folder.findFirst({
          where: {
            name: folder_name,
            userId: req.user.id,
          },
        });

        if (existingFolder) {
          throw new Error("Folder name already exists.");
        }

        return true;
      }),

    asyncHandler(async (req, res) => {
      const { folder_name, parent_folder = "root" } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // if (parent_folder !== "root") {
        //   return res.redirect(`/folders/${parent_folder}`);
        // } else {
        //   return res.redirect("/home");
        // }

        return res.status(400).render("home", {
          errors: errors.array(),
        });
      }

      try {
        const folderData = {
          name: folder_name,
          userId: req.user.id,
        };

        if (parent_folder !== "root") {
          folderData.parentFolderId = parent_folder;
        }

        await prisma.folder.create({
          data: folderData,
        });

        if (parent_folder !== "root") {
          res.redirect(`/folders/${parent_folder}`);
        } else {
          res.redirect("/home");
        }
      } catch (error) {
        console.log(error);
        res.status(500).render("home", {
          title: "Home",
          errors: [
            {
              msg: "An error occurred creating a folder. Please try again later.",
            },
          ],
          inputs: req.body,
          user: req.user,
        });
      }
    }),
  ],

  // Handle editing a folder
  edit_folder_post: [
    body("new_folder_name")
      .trim()
      .notEmpty()
      .withMessage("Name should not be empty.")
      .isLength({ max: 35 })
      .withMessage("Name exceeds 35 characters.")
      .matches(/^[a-zA-Z0-9\s!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?`~\-]+$/)
      .withMessage("Invalid input"),

    asyncHandler(async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).render("home", {
          title: "Home",
          errors: errors.array(),
          inputs: req.body,
        });
      }

      let { parent_folder, new_folder_name } = req.body;

      parent_folder = parent_folder || "root";

      try {
        await prisma.folder.update({
          where: {
            id: req.params.id,
          },
          data: {
            name: new_folder_name,
          },
        });

        if (parent_folder !== "root") {
          res.redirect(`/folders/${parent_folder}`);
        } else {
          res.redirect("/home");
        }
      } catch (error) {
        console.log(error);
        res.status(500).render("home", {
          title: "Home",
          errors: [
            {
              msg: "An error occurred during sign up. Please try again later.",
            },
          ],
          inputs: req.body,
        });
      }
    }),
  ],

  // Handle deleting a folder
  delete_folder_post: asyncHandler(async (req, res) => {
    const { parent_folder = "root" } = req.body;

    await prisma.folder.delete({
      where: {
        id: req.params.id,
      },
    });

    if (parent_folder !== "root") {
      res.redirect(`/folders/${parent_folder}`);
    } else {
      res.redirect("/home");
    }
  }),
};

export default folderController;
