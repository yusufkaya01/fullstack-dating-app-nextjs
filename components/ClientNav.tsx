"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { MessageCircleHeart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import NavDropDown from "./NavDropDown";
export default function ClientNav({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();

  const menuItems = ["Matches", "Lists", "Messages", "Login"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="dark-blue-mesh glass">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <MessageCircleHeart size={40} />
          </Link>
          <Link
            href="/"
            className=" text-2xl font-bold text-[#fff]/90 uppercase"
          >
            Dating
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        <NavbarItem>
          <Link
            color="foreground"
            href="/matches"
            className={clsx("", {
              "text-blue-400/90": path === "/matches",
            })}
          >
            Matches
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/lists"
            color="foreground"
            aria-current="page"
            className={clsx("", {
              "text-blue-400/90": path === "/lists",
            })}
          >
            List
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="/messages"
            className={clsx("", {
              "text-blue-400/90": path === "/messages",
            })}
          >
            Messages
          </Link>
        </NavbarItem>

        <NavbarItem>
          <NavDropDown />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user.id ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                href="/profile"
                color="foreground"
                className={clsx("", {
                  "text-blue-400/90": path === "/profile",
                })}
              >
                logged in as {user.firstName}
              </Link>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                href="/login"
                color="foreground"
                className={clsx("", {
                  "text-blue-400/90": path === "/login",
                })}
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/register"
                variant="flat"
                className={clsx("text-[#fff]/90", {
                  "text-blue-400/90": path === "/register",
                })}
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {item === "Login" ? (
              <Button
                as={Link}
                color="primary"
                href="/login"
                variant="flat"
                className="text-[#fff]/90 "
              >
                Login
              </Button>
            ) : (
              <Link
                className="w-full text-[#fff]/90"
                href={`/${item.toLowerCase()}`}
                size="lg"
              >
                {item}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
