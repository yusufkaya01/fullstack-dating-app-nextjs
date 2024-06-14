"use server";
import prisma from "@/utils/db";
import { getUser } from "@/utils/user";
import { revalidatePath, revalidateTag } from "next/cache";
export const addImage = async (url: string, publicId: string) => {
  try {
    const user = await getUser();
    if (!user) return;
    await prisma.member.update({
      where: {
        userId: user.id,
      },
      data: {
        photos: {
          create: [
            {
              url,
              publicId,
            },
          ],
        },
      },
    });

    revalidateTag(`member:${user.id}`);

    revalidateTag("members");

    revalidatePath("/members/edit/photos");
  } catch (err) {
    console.log(err);
  }
};
