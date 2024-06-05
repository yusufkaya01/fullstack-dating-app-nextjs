"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { getUser } from "./user";

export const getMembers = async () => {
  const user = await getUser();

  const members = await prisma.member.findMany({
    where: {
      NOT: {
        userId: user?.id,
      },
    },
  });

  revalidatePath("/members");

  return members;
};
