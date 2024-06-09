import { getMember } from "@/utils/members";
import { CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
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
          return (
            <Image
              src={photo.url}
              alt="photo"
              key={photo.id}
              width={200}
              height={200}
            />
          );
        })}
      </CardBody>
    </div>
  );
};

export default photosPage;
