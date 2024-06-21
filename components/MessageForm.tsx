"use client";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import SubmitBtn from "./SubmitBtn";
import { Plus, SendHorizonal, SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";

import { MessageSchema, messageSchema } from "@/utils/zodschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { createMessage } from "@/actions/messageAction";

const MessageForm = () => {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: MessageSchema) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("text", data.text);

    const res = await createMessage(formData, params.id);
    console.log(res);
    reset();
    setLoading(false);
  };

  return (
    <div className="w-full">
      <form
        className=" flex gap-2 items-center justify-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <div className="flex items-center justify-center gap-2">
            <label>
              <Input type="file" className="hidden" />
              <Button color="primary" variant="bordered" as="span">
                <Plus size={24} />
              </Button>
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
  );
};

export default MessageForm;
