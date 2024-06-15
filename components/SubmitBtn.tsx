"use client";
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const SubmitBtn = ({
  children,
  isValid,
  msg,
  isLoading,
  ...props
}: PropsWithChildren<{
  isValid: boolean;
  isLoading: boolean;
  msg: boolean;
}>) => {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      className={clsx("w-full", {
        "cursor-not-allowed": !isValid,
        "w-3/2": msg,
      })}
      type="submit"
      disabled={!isValid}
      isLoading={pending || isLoading}
    >
      {children}
    </Button>
  );
};

export default SubmitBtn;
