"use server";
import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/db";
import { getMember } from "@/utils/members";
import { createChatId, pusherServer } from "@/utils/pusher";
import { getUser } from "@/utils/user";
import { Photo } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export const addMessageImage = async (
  url: string,
  publicId: string,
  receiverId: string,
) => {
  try {
    const user = await getUser();
    if (!user) return;

    const newMessage = await prisma.message.create({
      data: {
        text: "",
        sender: {
          connect: { userId: user.id },
        },
        recipient: {
          connect: { userId: receiverId },
        },
        photo: {
          create: {
            url,
            publicId,
            member: {
              connect: { userId: user.id },
            },
          },
        },
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        dateSeen: true,
        senderId: true,
        receiverId: true,
        photo: true,
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
            userId: true,
          },
        },
        recipient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
            userId: true,
          },
        },
      },
    });

    await pusherServer.trigger(
      createChatId(user.id, receiverId),
      "message:new",
      {
        id: newMessage.id,
        text: newMessage.text,
        createdAt: newMessage.createdAt,
        dateSeen: newMessage.dateSeen,
        senderId: newMessage.senderId,
        receiverId: newMessage.receiverId,
        photo: newMessage.photo,
        sender: {
          id: newMessage.sender.id,
          firstName: newMessage.sender.firstName,
          lastName: newMessage.sender.lastName,
          image: newMessage.sender.image,
          userId: newMessage.sender.userId,
        },
        recipient: {
          id: newMessage.recipient.id,
          firstName: newMessage.recipient.firstName,
          lastName: newMessage.recipient.lastName,
          image: newMessage.recipient.image,
          userId: newMessage.recipient.userId,
        },
      },
    );

    revalidatePath(`/members/${receiverId}/chat`);
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
