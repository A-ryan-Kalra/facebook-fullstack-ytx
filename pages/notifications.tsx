import NotificationsFeed from "@/components/NotificationsFeed";
import { NextPageContext } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

function notifications() {
  return (
    <div>
      <NotificationsFeed />
    </div>
  );
}

export default notifications;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

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
