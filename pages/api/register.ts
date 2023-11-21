import bcrypt, { hash } from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { name, username, password, email } = req.body;

    if (!email || !username || !password || !name) {
      return res.status(401).json({ error: "Incomplete details" });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(422).json({
        error: "Email is already taken please try with another email.",
      });
    }
    const hashPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        hashedPassword: hashPassword,
        email,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
