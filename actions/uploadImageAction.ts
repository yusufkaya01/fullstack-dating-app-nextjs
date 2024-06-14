"use server";
import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/db";
import { getUser } from "@/utils/user";
import { Photo } from "@prisma/client";
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

export const setMainImage = async (photo: Photo) => {
  try {
    const user = await getUser();
    if (!user) return;
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        image: photo.url,
      },
    });
    await prisma.member.update({
      where: {
        userId: user.id,
      },
      data: {
        image: photo.url,
      },
    });
    // revalidateTag(`member:${user.id}`);
    // revalidateTag("members");
    revalidatePath("/members/edit/photos");
    revalidatePath("/members");
  } catch (err) {
    console.error(err);
  }
};

export const deleteImage = async (photo: Photo) => {
  try {
    const user = await getUser();

    if (!user) return;

    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId);
    }

    await prisma.member.update({
      where: {
        userId: user.id,
      },
      data: {
        photos: {
          delete: {
            id: photo.id,
          },
        },
      },
    });

    revalidatePath("/members/edit/photos");
  } catch (err) {
    console.error(err);
  }
};
