import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";

const Provider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <NextUIProvider>{children}</NextUIProvider>
    </div>
  );
};

export default Provider;
