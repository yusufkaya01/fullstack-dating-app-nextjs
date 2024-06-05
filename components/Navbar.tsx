import ClientNav from "./ClientNav";
import { Suspense } from "react";
import Loading from "./Loading";
import { getUser } from "@/utils/user";

const Navbar = async () => {
  const user = await getUser();
  return (
    <div>
      <Suspense
        fallback={
          <>
            <Loading />
          </>
        }
      >
        <ClientNav user={user} />
      </Suspense>
    </div>
  );
};

export default Navbar;
