"use client";
import ToxicityProvider from "@/context/ToxicityContext";
import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";

const Provider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ToxicityProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ToxicityProvider>
  );
};

export default Provider;
