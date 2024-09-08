import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authController = {
  // Handle login get
  login_get: asyncHandler(async (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect("/home");
    }

    res.render("login", { title: "Login", inputs: {} });
  }),

  // Handle login post
  login_post: [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email should not be empty.")
      .isEmail()
      .withMessage("It should be a valid email."),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password should not be empty."),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);

      // Handle errors
      if (!errors.isEmpty()) {
        return res.status(400).render("login", {
          title: "Log in",
          errors: errors.array(),
          inputs: req.body,
        });
      }

      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }

        // Handle error
        if (!user) {
          return res.status(400).render("login", {
            title: "Login",
            errors: [{ msg: info.message, path: "authentication" }],
            inputs: req.body,
          });
        }

        // Handle success
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect("/home");
        });
      })(req, res, next);
    }),
  ],

  // Handle sign up get
  sign_up_get: asyncHandler(async (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect("/home");
    }

    res.render("sign-up", { title: "Sign up", inputs: {} });
  }),

  // Handle sign up post
  sign_up_post: [
    // Validate first name
    body("first_name")
      .trim()
      .notEmpty()
      .withMessage("First name should not be empty.")
      .isLength({ max: 35 })
      .withMessage("First name exceeds 35 characters.")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("First name can only contain letters and spaces."),

    // Validate last name
    body("last_name")
      .trim()
      .notEmpty()
      .withMessage("Last name should not be empty.")
      .isLength({ max: 35 })
      .withMessage("Last name exceeds 35 characters.")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Last name can only contain letters and spaces."),

    // Validate email
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email should not be empty.")
      .isEmail()
      .withMessage("It should be a valid email.")
      .custom(async (value) => {
        const user = await prisma.user.findUnique({
          where: { email: value },
        });

        if (user) {
          throw new Error(
            "Email is already in use. Please use a different one."
          );
        }
      }),

    // Validate password
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password should be 8 characters long.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter.")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least on number.")
      .matches(/[@$!%*?&]/)
      .withMessage("Password must contain at least one special character."),

    // Validate confirm password
    body("confirm_password")
      .trim()
      .notEmpty()
      .withMessage("Confirm password should not be empty.")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Confirm password does not match password.");
        }

        return true;
      }),

    // Handle sign up
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);

      // Handle errors
      if (!errors.isEmpty()) {
        return res.status(400).render("sign-up", {
          title: "Sign up",
          errors: errors.array(),
          inputs: req.body,
        });
      }

      const { first_name, last_name, email, password } = req.body;

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
          data: {
            firstName: first_name,
            lastName: last_name,
            email: email,
            password: hashedPassword,
          },
        });

        res.redirect("/login");
      } catch (error) {
        res.status(500).render("sign-up", {
          title: "sign-up",
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

  auth_google_get: asyncHandler(async (req, res, next) => {
    passport.authenticate("google", { scope: ["email", "profile"] })(
      req,
      res,
      next
    );
  }),

  auth_google_callback_get: asyncHandler(async (req, res, next) => {
    passport.authenticate("google", {
      successRedirect: "/home",
      failureRedirect: "/",
    })(req, res, next);
  }),
};

export default authController;
