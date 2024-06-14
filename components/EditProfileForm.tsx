"use client";
import { Card, CardBody, CardHeader, Input, Textarea } from "@nextui-org/react";
import React from "react";
import SubmitBtn from "./SubmitBtn";
import { SquarePen } from "lucide-react";
import { Member } from "@prisma/client";
import { useFormState } from "react-dom";
import { EditProfile } from "@/actions/EditProfile";
import { useForm } from "react-hook-form";
import { EditSchema, editProfileSchema } from "@/utils/zodschema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  member: Member;
};

const initial = {
  message: null,
  errors: [],
};

const EditProfileForm = ({ member }: Props) => {
  const [formState, action] = useFormState(EditProfile, initial);

  const {
    register,
    formState: { errors, isValid },
  } = useForm<EditSchema>({
    resolver: zodResolver(editProfileSchema),
    mode: "onTouched",
  });
  return (
    <div className="flex items-center justify-center h-full">
      {" "}
      <Card
        shadow="sm"
        className="glass ash-mesh sm:w-[50%] mx-auto px-10 py-5 w-[100%]"
      >
        <CardHeader className="flex items-center justify-center gap-1">
          <SquarePen size={24} />
          <span className="text-center text-xl">Edit Profile</span>
        </CardHeader>

        <CardBody className="w-full">
          <form className="space-y-4" action={action}>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                {...register("firstName")}
                type="firstName"
                label="First Name"
                defaultValue={member.firstName}
                isInvalid={errors.firstName as never as boolean}
                errorMessage={errors.firstName?.message}
              />
              <Input
                {...register("lastName")}
                type="lastName"
                label="Last Name"
                defaultValue={member.lastName}
                isInvalid={errors.lastName as never as boolean}
                errorMessage={errors.lastName?.message}
              />
            </div>
            <Input
              {...register("city")}
              type="text"
              label="City"
              defaultValue={member.city}
              isInvalid={errors.city as never as boolean}
              errorMessage={errors.city?.message}
            />
            <Textarea
              {...register("description")}
              type="text"
              label="Description"
              defaultValue={member.description}
              isInvalid={errors.description as never as boolean}
              errorMessage={errors.description?.message}
            />
            {/* 
            {formState?.message && (
              <div className=" text-red-400/65 p-2">
                {formState?.code === "P2002"
                  ? "user already exists"
                  : formState.message}
              </div>
            )} */}

            <SubmitBtn color="primary" variant="bordered" isValid={isValid}>
              Edit Profile
            </SubmitBtn>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditProfileForm;
