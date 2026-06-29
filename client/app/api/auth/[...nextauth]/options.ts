import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Login with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        autoLogin: { label: "Auto Login", type: "text" },
        accessToken: { label: "Access Token", type: "text" },
        userId: { label: "User ID", type: "text" },
      },

      async authorize(credentials): Promise<any> {
        if (!credentials?.email) {
          throw new Error("Email is required");
        }

        // Credentials for auto login (post email-verification)
        if (credentials.autoLogin === "true") {
          return {
            _id: credentials.userId,
            email: credentials.email,
            accessToken: credentials.accessToken,
          };
        }

        if (!credentials.password) {
          throw new Error("Password is required");
        }

        try {
          const res = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.detail || "Invalid credentials");
          }

          return {
            _id: data.user_id?.toString(),
            email: data.email,
            accessToken: data.access_token,
          };
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Call FastAPI Google Login to verify identity token and register/retrieve database user
          const res = await fetch("http://localhost:8000/auth/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: account.id_token }),
          });

          const data = await res.json();

          if (!res.ok) {
            console.error("Google sign-in API failure:", data);
            return false;
          }

          // Populate NextAuth session fields with FastAPI values
          user._id = data.user_id?.toString();
          user.accessToken = data.access_token;
        } catch (error) {
          console.error("Google sign-in connection error:", error);
          return false;
        }
      }
      return true;
    },

    async session({ session, token }) {
      if (session) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.accessToken = user.accessToken;
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
