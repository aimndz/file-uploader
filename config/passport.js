import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
dotenv.config();

// ------ LOCAL STRATEGY -------- //
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        // Check if the email exists
        if (!user) {
          return done(null, false, {
            message: "Incorrect email or password.",
          });
        }

        // Check if the given password match with the password
        const isMatch = await bcrypt.compare(password, user.password);

        // Handle error if unmatch
        if (!isMatch) {
          return done(null, false, {
            message: "Incorrect email or password.",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// ------ GOOGLE OAUTH2 STRATEGY -------- //
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        // Find user if exists
        let user = await prisma.user.findUnique({
          where: { email: profile._json.email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile._json.email,
              firstName: profile._json.given_name,
              lastName: profile._json.family_name,
              googleId: profile.id,
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
