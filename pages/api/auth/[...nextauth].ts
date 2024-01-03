import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/libs/prismadb";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid Credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials from database");
        }
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword as string
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid Password");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  // jwt: {
  //   secret: process.env.NEXTAUTH_JWT_SECRET,
  // },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
