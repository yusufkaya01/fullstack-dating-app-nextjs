"use client";
import { Card, CardBody, Divider, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  member: Member;
  navLinks: { name: string; href: string }[];
};

const Sidebar = ({ member, navLinks }: SidebarProps) => {
  const pathName = usePathname();
  const basePath = `/members/${member.userId}`;
  // const navLinks = [
  //   { name: "Profile", href: `${basePath}` },
  //   {
  //     name: "Photos",
  //     href: `${basePath}/photos`,
  //   },
  //   {
  //     name: "Chat",
  //     href: `${basePath}/chat`,
  //   },
  // ];

  return (
    <Card className="w-full mt-10 items-center h-[80vh]  ash-mesh border-t-1 border-b-1">
      <Image
        src={member?.image as string}
        alt={member?.firstName}
        height={200}
        width={200}
        className="rounded-full mt-6 aspect-square object-cover"
      />

      <CardBody>
        <div className="flex flex-col items-center">
          <div className="text-2xl">
            {member.firstName} {member.lastName},
            {new Date().getFullYear() -
              new Date(member.dateOfBirth).getFullYear()}
          </div>
          <div className="text-sm text-neutral-400/95">
            {member.city}, {member.country}
          </div>
        </div>
        <Divider className="my-4" />
        <nav className="flex  flex-col p-4 ml-4 text-2xl gap-4">
          {navLinks.map((link) => {
            return (
              <Link
                href={link.href}
                key={link.name}
                className={clsx("rounded-lg block px-4 py-2", {
                  "bg-primary-400/80 text-white": pathName === link.href,
                  "hover:bg-primary-100": pathName !== link.href,
                })}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </CardBody>
    </Card>
  );
};

export default Sidebar;
