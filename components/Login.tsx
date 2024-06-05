"use client";
import React from "react";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "@/utils/zodschema";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "./SubmitBtn";
import { signinUser } from "@/actions/auth";
import { useFormState } from "react-dom";

const initial = {
  messsage: null,
  errors: null,
  code: null,
};

export default function Login() {
  const [formState, action] = useFormState(signinUser, initial);

  const {
    register,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

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
          <span className="text-center text-xl">Login</span>
        </CardHeader>

        <CardBody className="w-full">
          <form className="space-y-4" action={action}>
            <Input
              type="email"
              label="Email"
              defaultValue=""
              {...register("email")}
              isInvalid={errors.email as never as boolean}
              errorMessage={errors.email?.message}
            />
            <Input
              type="password"
              defaultValue=""
              label="Password"
              {...register("password")}
              isInvalid={errors.password as never as boolean}
              errorMessage={errors.password?.message}
            />

            {formState.message && (
              <div className="text-red-500/90">{formState.message}</div>
            )}

            <SubmitBtn isValid={isValid} color="primary" variant="bordered">
              login
            </SubmitBtn>
          </form>
          <div className="mt-2">
            <span>Don't have an account? </span>
            <Link href="/register" className="text-blue-500/90">
              Register
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
