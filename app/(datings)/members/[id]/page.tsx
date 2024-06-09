import Sidebar from "@/components/Sidebar";
import { getMember } from "@/utils/members";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const member = await getMember(params.id);

  if (!member) return notFound();

  return (
    <>
      <div className="glass light-blue-mesh h-full">
        user name : {member.firstName}+{member.lastName}
      </div>
    </>
  );
};

export default page;
