"use client";
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const SubmitBtn = ({
  children,
  isValid,
  ...props
}: PropsWithChildren<{
  isValid: boolean;
}>) => {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      className={clsx("w-full", !isValid && "cursor-not-allowed")}
      type="submit"
      disabled={!isValid}
      isLoading={pending}
    >
      {children}
    </Button>
  );
};

export default SubmitBtn;
