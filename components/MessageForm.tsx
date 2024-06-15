"use client";
import { Card, CardBody, CardHeader, Input, Textarea } from "@nextui-org/react";
import React from "react";
import SubmitBtn from "./SubmitBtn";
import { SendHorizonal, SquarePen } from "lucide-react";
import { Member } from "@prisma/client";
import { useFormState } from "react-dom";
import { EditProfile } from "@/actions/EditProfile";
import { useForm } from "react-hook-form";
import {
  EditSchema,
  MessageSchema,
  editProfileSchema,
  messageSchema,
} from "@/utils/zodschema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  member: Member;
};

// const initial = {
//   message: null,
//   errors: [],
// };

const MessageForm = ({ member }: Props) => {
  //   const [formState, action] = useFormState(EditProfile, initial);

  const {
    register,
    formState: { errors, isValid },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    mode: "onTouched",
  });
  return (
    <div className="w-full">
      <form className=" flex gap-2 items-center justify-center ">
        <div className="w-full">
          <Input
            {...register("text")}
            type="text"
            className="w-full h-full"
            //   defaultValue={member.city}
            //   isInvalid={errors.city as never as boolean}
            //   errorMessage={errors.city?.message}
          />
        </div>

        {/* 
{formState?.message && (
  <div className=" text-red-400/65 p-2">
    {formState?.code === "P2002"
      ? "user already exists"
      : formState.message}
  </div>
)} */}

        {/* <SubmitBtn color="primary" variant="bordered" isValid={isValid}>
          Edit Profile
        </SubmitBtn> */}
        <div
          className="

         
        "
        >
          <SendHorizonal size={24} />
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
