"use client";
import { Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";

type Props = {
  photo: Photo | null;
};

const MemberImage = ({ photo }: Props) => {
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className="rounded-2xl"
          alt="Image of member"
          priority
        />
      ) : (
        <Image src={photo?.url} alt="edit photo" height={220} width={220} />
      )}
    </div>
  );
};

export default MemberImage;
