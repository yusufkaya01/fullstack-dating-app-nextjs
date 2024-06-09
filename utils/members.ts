"use server";
import prisma from "./db";
import { memoize } from "nextjs-better-unstable-cache";

export const getMembers = memoize(
  async (userId: string) => {
    const members = await prisma.member.findMany({
      where: {
        NOT: {
          userId: userId,
        },
      },
    });

    return members;
  },
  {
    persist: true,
    log: ["datacache", "verbose"],
    suppressWarnings: true,
    revalidateTags: () => ["members"],
  },
);

export const getMember = memoize(
  async (id: string) => {
    const member = await prisma.member.findUnique({
      where: {
        userId: id,
      },
      include: {
        photos: true,
      },
    });

    return member;
  },
  {
    persist: true,
    log: ["datacache", "verbose"],
    suppressWarnings: true,
    revalidateTags: (id: string) => [`member:${id}`],
  },
);
