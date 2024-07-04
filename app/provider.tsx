"use client";
import { NudeProvider } from "@/context/NudeContext";
import ToxicityProvider from "@/context/ToxicityContext";
import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";

const Provider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <NudeProvider>
      <ToxicityProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ToxicityProvider>
    </NudeProvider>
  );
};

export default Provider;
