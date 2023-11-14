import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid Id");
    }

    const post = await prisma.post.delete({
      where: { id: postId },
    });
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
