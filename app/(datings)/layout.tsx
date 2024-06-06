import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";

const Homelayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <Navbar />

      <div className="w-full">{children}</div>
    </div>
  );
};

export default Homelayout;
