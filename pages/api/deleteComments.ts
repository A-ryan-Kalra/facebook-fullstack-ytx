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
    const { commentsId } = req.body;
    if (!commentsId || typeof commentsId !== "string") {
      throw new Error("Invalid id");
    }

    const comments = await prisma.comment.delete({
      where: { id: commentsId },
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
