import DeleteButton from "@/components/DeleteButton";
import MemberImage from "@/components/MemberImage";
import MemberPhotoUpload from "@/components/MemberPhotoUpload";
import MemberPhotos from "@/components/MemberPhotos";
import StarButton from "@/components/StarButton";
import { getMemberPhotosByUserId } from "@/utils/members";
import { getUser } from "@/utils/user";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";

const UpdatePhotosPage = async () => {
  const user = await getUser();
  const photos = await getMemberPhotosByUserId(user.id);
  return (
    <div className="glass light-blue-mesh h-full">
      <CardHeader className="text-3xl font-bold">Photos</CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotoUpload />
        <MemberPhotos photos={photos} editable={true} mainImage={user.image} />
      </CardBody>
    </div>
  );
};

export default UpdatePhotosPage;
