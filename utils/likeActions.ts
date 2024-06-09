import prisma from "./db";
import { getUser } from "./user";

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
