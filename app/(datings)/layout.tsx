import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";

const Homelayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
};

export default Homelayout;
