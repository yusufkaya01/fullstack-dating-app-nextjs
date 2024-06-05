"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import { signoutUser } from "@/actions/auth";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

export default function NavbarDropDown({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform glass"
            src={user.image}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions">
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue="
          Full Name
          "
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{`${user.firstName + " " + user.lastName}`}</p>
          </DropdownItem>

          <DropdownItem
            as={Link}
            href="/memebers/profile"
            key="settings"
            textValue="
           Profile
           "
          >
            Edit profile
          </DropdownItem>

          <DropdownItem
            key="logout"
            color="danger"
            onClick={() => {
              signoutUser();
            }}
            textValue="
            Log out
            "
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
