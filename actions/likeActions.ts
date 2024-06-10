"use server";
import { revalidateTag } from "next/cache";

import prisma from "@/utils/db";
import { getUser } from "@/utils/user";

export const toggleLikeMember = async (
  targetUserId: string,
  isLiked: boolean,
) => {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }

  if (isLiked) {
    await prisma.like.delete({
      where: {
        sourceUserId_targetUserId: {
          targetUserId,
          sourceUserId: user.id,
        },
      },
    });
  } else {
    await prisma.like.create({
      data: {
        sourceUserId: user.id,
        targetUserId,
      },
    });
  }
  revalidateTag("members");
};

export const getAllLikesByLoginMember = async () => {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const likes = await prisma.like.findMany({
    where: {
      sourceUserId: user.id,
    },
    select: {
      targetUserId: true,
    },
  });
  return likes.map((like) => like.targetUserId);
};

export const getLikedMembers = async (type = "sourceLikes") => {
  const user = await getUser();

  switch (type) {
    case "sourceLikes":
      return await fetchSourceLikes(user?.id);
    case "targetLikes":
      return await fetchTargetLikes(user?.id);
    case "mutualLikes":
      return await fetchMutualLikes(user?.id);

    default:
      return [];
  }
};

async function fetchSourceLikes(userId: string) {
  const sourceLikesList = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    include: {
      targetUser: true,
    },
  });
  return sourceLikesList.map((like) => like.targetUser);
}

async function fetchTargetLikes(userId: string) {
  const targetLikesList = await prisma.like.findMany({
    where: {
      targetUserId: userId,
    },
    include: {
      sourceUser: true,
    },
  });
  return targetLikesList.map((like) => like.sourceUser);
}

async function fetchMutualLikes(userId: string) {
  // i like how many users:
  const sourceLikesList = await getAllLikesByLoginMember();

  // how many users like me:
  const mutualLikesList = await prisma.like.findMany({
    where: {
      AND: [
        {
          targetUserId: userId,
        },
        {
          sourceUserId: {
            in: sourceLikesList,
          },
        },
      ],
    },
    select: {
      sourceUser: true,
    },
  });
  return mutualLikesList.map((like) => like.sourceUser);
}
