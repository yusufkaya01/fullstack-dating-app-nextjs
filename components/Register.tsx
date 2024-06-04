"use client";

import React from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, registerSchema } from "@/utils/zodschema";
import clsx from "clsx";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });
  const onSubmit = (data: RegisterSchema) => {
    console.log(data);
    console.log("baal");
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-full
      -translate-y-15
    
    "
    >
      <Card
        shadow="sm"
        className="glass ash-mesh sm:w-[50%] mx-auto px-10 py-5 w-[100%]"
      >
        <CardHeader className="flex items-center justify-center gap-1">
          <Lock size={24} />
          <span className="text-center text-xl">Register</span>
        </CardHeader>

        <CardBody className="w-full">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                {...register("firstName")}
                type="firstName"
                label="First Name"
                isInvalid={errors.firstName as never as boolean}
                errorMessage={errors.firstName?.message}
              />
              <Input
                type="lastName"
                label="Last Name"
                {...register("lastName")}
                isInvalid={errors.lastName as never as boolean}
                errorMessage={errors.lastName?.message}
              />
            </div>
            <Input
              {...register("email")}
              type="email"
              label="Email"
              isInvalid={errors.email as never as boolean}
              errorMessage={errors.email?.message}
            />
            <Input
              type="password"
              label="Password"
              isInvalid={errors.password as never as boolean}
              errorMessage={errors.password?.message}
              {...register("password")}
            />
            <Button
              color="primary"
              variant="bordered"
              className={clsx("w-full", !isValid && "cursor-not-allowed")}
              type="submit"
              disabled={!isValid}
            >
              Register
            </Button>
          </form>
          <div className="mt-2">
            <span>Already have an account? </span>
            <Link href="/login" className="text-blue-500/90">
              Login
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
