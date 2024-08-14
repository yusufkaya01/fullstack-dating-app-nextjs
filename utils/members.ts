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
      orderBy: {
        updatedAt: "desc",
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

export const getMemberPhotosByUserId = memoize(
  async (userId: string) => {
    const memeberPhotos = await prisma.member.findMany({
      where: {
        userId: userId,
      },
      select: {
        photos: true,
      },
    });
    if (!memeberPhotos[0] || !memeberPhotos[0].photos) return [];
    return memeberPhotos[0].photos;
  },
  {
    persist: true,
    log: ["datacache", "verbose"],
    suppressWarnings: true,
    revalidateTags: (userId: string) => [`photos:${userId}`],
  },
);

export const getAllMembersId = async () => {
  const members = await prisma.member.findMany({
    select: {
      userId: true,
    },
  });

  return members.map((member) => member.userId);
};
