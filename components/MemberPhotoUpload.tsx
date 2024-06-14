"use client";

import { addImage } from "@/actions/uploadImageAction";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import ImageUploadButton from "./ImageUploadButton";

export default function MemberPhotoUpload() {
  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === "object") {
      await addImage(result.info.secure_url, result.info.public_id);
    } else {
      console.error("Failed to upload image");
    }
  };
  return (
    <div className="pt-5 pl-5">
      <ImageUploadButton onUploadImage={onAddImage} />
    </div>
  );
}
