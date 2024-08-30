import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        console.log("User: " + user);

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
        console.log("Successfully login");
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
