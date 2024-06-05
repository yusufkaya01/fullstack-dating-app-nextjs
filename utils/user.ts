"import server-only";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "./constants";
import { getUserFromToken } from "./authDb";

export const getUser = async () => {
  const userTokenfromCookie = cookies().get(COOKIE_NAME) as {
    name: string;
    value: string;
  };
  const user = await getUserFromToken(userTokenfromCookie);
  return user;
};
