import { getMember } from "@/utils/members";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const member = await getMember(params.id);

  if (!member) return notFound();

  return (
    <div className="glass light-blue-mesh h-full">
      <CardHeader className="text-3xl font-bold">Profile</CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </div>
  );
};

export default page;
