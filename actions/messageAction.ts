"use server";
import prisma from "@/utils/db";
import { getUser } from "@/utils/user";
import { messageSchema } from "@/utils/zodschema";
import { revalidatePath } from "next/cache";

let data;

export const createMessage = async (
  formData: FormData,
  recipientId: string,
) => {
  try {
    data = messageSchema.parse({
      text: formData.get("text"),
    });
  } catch (err: any) {
    console.error("zod error", err);
    return {
      message: "Invalid data",
      errors: err.errors,
    };
  }

  try {
    const user = await getUser();
    if (!user) return;
    const newMessage = await prisma.message.create({
      data: {
        senderId: user.id,
        receiverId: recipientId,
        text: data.text,
      },
    });
    revalidatePath(`/members/${recipientId}/chat`);
  } catch (err: any) {
    console.error(err);
    return {
      message: err.message,
      errors: err.errors,
    };
  }
};

export const getMessageThread = async (recipientId: string) => {
  const user = await getUser();
  if (!user) return;
  try {
    return await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: user.id,
            receiverId: recipientId,
          },
          {
            senderId: recipientId,
            receiverId: user.id,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        dateSeen: true,
        senderId: true,

        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
        recipient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
