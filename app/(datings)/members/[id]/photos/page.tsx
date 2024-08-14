import MemberImage from "@/components/MemberImage";
import { getMember } from "@/utils/members";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";

const photosPage = async ({ params }: { params: { id: string } }) => {
  const member = await getMember(params.id);
  const photos = member?.photos;

  if (!photos) return null;
  return (
    <div className="glass light-blue-mesh h-full">
      <CardHeader className="text-3xl font-bold ">Photos</CardHeader>
      <Divider />
      <CardBody className=" grid grid-cols-5 gap-3">
        {photos.map((photo) => {
          return <MemberImage key={photo.id} photo={photo} />;
        })}
      </CardBody>
    </div>
  );
};

export default photosPage;
