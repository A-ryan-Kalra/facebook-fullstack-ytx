import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import notifications from "@/pages/notifications";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";

function NotificationsFeed() {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const {
    data: fetchedNotifications = [],
    mutate,
    isLoading: fetchingNotifications,
  } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  mutate();
  // console.log(fetchedNotifications);
  if (fetchedNotifications?.length === 0 || fetchingNotifications) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {fetchedNotifications.map(
        (notification: Record<string, any>, index: number) => (
          <div
            key={index}
            className="flex flex=row items-center p-4 gap-4 border-b-[1px] border-neutral-800"
          >
            <Icon icon="ant-design:notification-filled" width={30} />
            <p className="text-[20px]">
              {fetchedNotifications.length - index} {notification?.body}
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default NotificationsFeed;
