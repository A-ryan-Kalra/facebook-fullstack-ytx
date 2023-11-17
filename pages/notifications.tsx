import NotificationsFeed from "@/components/NotificationsFeed";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";

function notifications() {
  return (
    <div>
      <NotificationsFeed />
    </div>
  );
}

export default notifications;

export async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
