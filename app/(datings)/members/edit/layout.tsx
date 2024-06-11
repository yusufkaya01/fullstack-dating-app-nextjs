import Sidebar from "@/components/Sidebar";
import { getMember } from "@/utils/members";
import { getUser } from "@/utils/user";
import { Card } from "@nextui-org/react";
import { PropsWithChildren } from "react";

const layout = async ({ children }: PropsWithChildren<{}>) => {
  const user = await getUser();
  const member = await getMember(user.id);
  const basePath = `/members/edit`;
  const navLinks = [
    { name: "Edit Profile", href: `${basePath}` },
    {
      name: "Update Photos",
      href: `${basePath}/photos`,
    },
  ];
  return (
    <div className="grid grid-cols-12 sm:gap-5 h-[100vh] container mx-auto gap-1">
      <div className="sm:col-span-3 col-span-12">
        <Sidebar member={member} navLinks={navLinks} />
      </div>
      <div className="sm:col-span-9 col-span-12">
        <Card className="w-full mt-10 h-[80vh]">{children}</Card>
      </div>
    </div>
  );
};

export default layout;
