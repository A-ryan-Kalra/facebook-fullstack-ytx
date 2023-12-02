import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.status(405).end();
  }
  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid Id");
    }
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error("Invalid id");
    }
    let updatedLikes = [...(post?.likedIds || [])];
    if (updatedLikes.includes(currentUser.id)) {
      updatedLikes = updatedLikes.filter((id) => id !== currentUser.id);
    } else {
      updatedLikes.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: "Someone liked your post",
              userId: post.userId,
            },
          });

          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotification: true,
            },
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikes,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
