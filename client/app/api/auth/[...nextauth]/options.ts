import User from "@/database/models/userModel";
import connectDB from "@/lib/connection";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Login with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        autoLogin: { label: "Auto Login", type: "text" },
      },

      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email) {
          throw new Error("Email is required");
        }

        await connectDB();

        try {
          const user = await User.findOne({
            email: credentials?.email,
          });
          if (!user) {
            throw new Error("Invalid email");
          }

          if (!user?.isVerified) {
            throw new Error("User not verified");
          }

          // credentials for auto login
          if (credentials.autoLogin === "true") {
            
            return user;
          }

          //password login
          if (!credentials.password) {
            throw new Error("Password is required");
          }

          const isMatch = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (!isMatch) {
            throw new Error("Invalid password");
          }

          return user;
        } catch (error) {
          console.error("Authorization error:", error);

          if (error instanceof Error) {
            throw new Error(error.message || "Authentication failed");
          } else {
            throw new Error("Authentication failed");
          }
        }
      },
    }),
    //google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        try {
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const newUserData = {
              email: user.email,
              name: user.name,
              provider: "google",
              isVerified: true,
            };

            existingUser = await User.create(newUserData);
          }

          user._id = existingUser._id;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },

    async session({ session, token }) {
      if (session) {
        session.user._id = token._id;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
