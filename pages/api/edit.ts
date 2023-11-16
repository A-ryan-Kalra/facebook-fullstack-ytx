import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    const { name, username, profileImage, coverImage, bio } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        username,
        image: profileImage,
        coverImage,
        bio,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
