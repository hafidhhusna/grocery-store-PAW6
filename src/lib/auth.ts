import { DefaultSession, NextAuthOptions } from "next-auth";
import { prisma } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import crypto from "crypto";// Add this
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      credits: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    credits: number;
  }
}

const generateUsername = (name: string | null, email: string) => {
  const base = name ? name.replace(/\s+/g, "").toLowerCase() : email.split("@")[0];
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${base}${randomSuffix}`;
};

const generateHashedPassword = async () => {
  const salt = await bcrypt.genSalt(10);
  const randomPassword = crypto.randomBytes(16).toString("hex");
  return await bcrypt.hash(randomPassword, salt);
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // When the user logs in, update the token with user details
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      } else if (!token.id) {
        // Fallback if no user in token
        const db_user = await prisma.user.findFirst({
          where: {
            email: token.email || "",
          },
        });
        if (db_user) {
          token.id = db_user.id;
          token.name = db_user.name;
          token.email = db_user.email;
        }
      }
      return token;
    },    
    session: ({ session, token }) => {
      console.log("Token in session callback:", token);
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    
  },
  events: {
    createUser: async ({ user }) => {
      const username = generateUsername(user.name as string, user.email as string);
      const password = await generateHashedPassword();
      // Update the new user with generated username and password
      await prisma.user.update({
        where: { id: user.id },
        data: {
          username,
          password,
        },
      });

      // Create a cart for the user
      await prisma.cart.create({
        data: {
          userId: user.id, // Link the cart to the user
        },
      });
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { username, password } = credentials!;
          console.log("Authorizing user:", username);
      
          const user = await prisma.user.findUnique({ where: { username } });
      
          if (!user || !user.password) {
            console.error("User not found or invalid credentials:", username);
            throw new Error("Invalid username or password");
          }
      
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            console.error("Invalid password for:", username);
            throw new Error("Invalid username or password");
          }
      
          console.log("User authenticated successfully:", user.id);
          return { id: user.id, username: user.username, name: user.username };
        } catch (error) {
          console.error("Authorize error:", error);
          throw error;
        }
      }
      
    }),
  ],
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
