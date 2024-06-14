"use client";

import { UploadCloudIcon } from "lucide-react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

type Props = {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
};

const ImageUploadButton = ({ onUploadImage }: Props) => {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={onUploadImage}
      signatureEndpoint="/api/sign-image"
      uploadPreset="dating-app-demo"
      className="flex items-center gap-2 bg-secondary text-white rounded-lg py-2 px-4 hover:bg-secondary/70 "
    >
      <UploadCloudIcon size={28} />
      Upload Image
    </CldUploadButton>
  );
};

export default ImageUploadButton;
