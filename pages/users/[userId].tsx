import Form from "@/components/Form";
import PostFeed from "@/components/users/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

function UserProfile() {
  const router = useRouter();
  const { userId } = router.query;
  const { data, error, isLoading, mutate } = useUser(userId as string);
  if (isLoading || !data) {
    return (
      <div className="flex h-full justify-center items-center">
        <ClipLoader size={80} />
      </div>
    );
  }
  mutate();
  // console.log(data);
  return (
    <div>
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <Form label="Post something new!" />
      <PostFeed userId={userId as string} />
    </div>
  );
}

export default UserProfile;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  setTimeout(() => {
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }, 100);

  return {
    props: {
      session,
    },
  };
}
