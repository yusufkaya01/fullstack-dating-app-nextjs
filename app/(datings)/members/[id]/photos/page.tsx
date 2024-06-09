import { getMember } from "@/utils/members";
import { Image } from "@nextui-org/react";
import React from "react";

const photosPage = async ({ params }: { params: { id: string } }) => {
  const member = await getMember(params.id);
  const photos = member?.photos;

  if (!photos) return null;
  return (
    <div className="glass light-blue-mesh h-full">
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
    </div>
  );
};

export default photosPage;
