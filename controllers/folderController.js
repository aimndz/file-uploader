import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const folderController = {
  display_folder_get: asyncHandler(async (req, res) => {
    const folderName = await prisma.folder.findFirst({
      where: {
        id: req.params.id,
      },
    });

    // Temporarily empty
    const items = [];

    res.render("home", {
      title: folderName.name,
      items: items,
      user: req.user,
    });
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

      const { folder_name } = req.body;

      try {
        await prisma.folder.create({
          data: {
            name: folder_name,
            userId: req.user.id,
          },
        });

        res.redirect("/home");
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

      const { new_folder_name } = req.body;

      try {
        await prisma.folder.update({
          where: {
            id: req.params.id,
          },
          data: {
            name: new_folder_name,
          },
        });

        res.redirect("/home");
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
    await prisma.folder.delete({
      where: {
        id: req.params.id,
      },
    });

    res.redirect("/home");
  }),
};

export default folderController;
