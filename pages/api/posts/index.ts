import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    if (req.method === "POST") {
      const { body, postImage } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          image: postImage,
          userId: currentUser.id,
        },
      });
      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: { createdAt: "desc" },
        });
      } else {
        posts = await prisma.post.findMany({
          where: {
            userId: {
              in: [...(currentUser.followingIds || []), currentUser.id],
            },
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
