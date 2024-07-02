"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import SubmitBtn from "./SubmitBtn";
import { Plus, SendHorizonal } from "lucide-react";
import { useForm } from "react-hook-form";

import { MessageSchema, messageSchema } from "@/utils/zodschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { createMessage } from "@/actions/messageAction";
import { useToxicity } from "@/context/ToxicityContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import ImageUploadButton from "./ImageUploadButton";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { addMessageImage } from "@/actions/uploadImageAction";

const MessageForm = () => {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const { handleToxicity, isToxic } = useToxicity();
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store the uploaded image URL

  console.log(isToxic);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setFocus,
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    setFocus("text");
  }, [setFocus]);

  const handleImageUpload = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === "object") {
      setImageUrl(result.info.secure_url);
      await addMessageImage(
        result.info.secure_url,
        result.info.public_id,
        params.id,
      );
    }
  };

  const onSubmit = async (data: MessageSchema) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("text", data.text);

    const isMessageToxic = await handleToxicity(data.text);
    console.log(isMessageToxic);

    if (!isMessageToxic) {
      const res = await createMessage(formData, params.id);
      console.log(res);
      reset();
    } else {
      console.log("Message is toxic and will not be sent");
    }

    setLoading(false);
  };

  return (
    <>
      {isToxic && (
        <div
          className="
      bg-red-500
      text-white
      rounded-md
      p-2
      absolute
      top-[20%]
      left-0
      w-full
      text-center
      z-50
    "
        >
          Message is toxic and will not be sent
        </div>
      )}

      <div className="w-full">
        <form
          className="flex gap-2 items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <div className="flex items-center justify-center gap-2">
              <label>
                <ImageUploadButton
                  onUploadImage={handleImageUpload}
                  isMessage={true}
                />
              </label>
              <Input
                {...register("text")}
                type="text"
                className="w-full h-full"
                isInvalid={errors.text as never as boolean}
                errorMessage={errors.text?.message}
              />
            </div>
          </div>

          <SubmitBtn
            msg={true}
            color="primary"
            variant="bordered"
            isValid={isValid}
            isLoading={loading}
          >
            <SendHorizonal size={24} />
          </SubmitBtn>
        </form>
      </div>
    </>
  );
};

export default MessageForm;
