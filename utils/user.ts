"import server-only";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "./constants";
import { getUserFromToken } from "./authDb";
import { cache } from "react";

export const getUser = cache(async () => {
  console.log("user");
  const userTokenfromCookie = cookies().get(COOKIE_NAME) as {
    name: string;
    value: string;
  };
  const user = await getUserFromToken(userTokenfromCookie);
  return user;
});
