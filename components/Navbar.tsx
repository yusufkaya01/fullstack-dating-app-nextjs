import ClientNav from "./ClientNav";
import { Suspense } from "react";
import Loading from "./Loading";
import { getUser } from "@/utils/user";
import { getMember } from "@/utils/members";

const Navbar = async () => {
  const { id } = await getUser();
  const user = await getMember(id);
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
