import { User } from "@/app/types/user";
import React from "react";
import NavBar from "./navbar";
import NavbarPhone from "./navbar-phone";
import { NotificationsProvider } from "@/app/store/NotificationProvider";

const NavbarContext = ({ user, count }: { user: User[]; count: number }) => {
  return (
    <>
      <NotificationsProvider>
        <NavBar user={user} num_noti={count!} />
        <NavbarPhone num_noti={count!} user={user} />
      </NotificationsProvider>
    </>
  );
};

export default NavbarContext;
