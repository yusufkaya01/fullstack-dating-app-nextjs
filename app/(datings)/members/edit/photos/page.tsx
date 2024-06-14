import DeleteButton from "@/components/DeleteButton";
import MemberImage from "@/components/MemberImage";
import MemberPhotoUpload from "@/components/MemberPhotoUpload";
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

        <div className="grid grid-cols-5 gap-3 p-5">
          {photos &&
            photos.map((photo) => {
              return (
                <div key={photo.id} className="relative">
                  <MemberImage photo={photo} />

                  <div className="absolute top-3 left-3 z-50">
                    <StarButton loading={false} selected={false} />{" "}
                  </div>
                  <div className="absolute top-3 right-3 z-50">
                    <DeleteButton loading={false} />{" "}
                  </div>
                </div>
              );
            })}
        </div>
      </CardBody>
    </div>
  );
};

export default UpdatePhotosPage;
