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
    const messages = await prisma.message.findMany({
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
        receiverId: true,
        photo: true,

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

    if (messages.length > 0) {
      await prisma.message.updateMany({
        where: {
          senderId: recipientId,
          receiverId: user.id,
          dateSeen: null,
        },
        data: { dateSeen: new Date() },
      });
    }

    const mapMessages = messages.map((message) => {
      return {
        id: message.id,
        text: message.text,
        createdAt: new Date(message.createdAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
        photo: message.photo,
        dateSeen: message.dateSeen,
        senderId: message.senderId,
        sender: {
          id: message.sender.id,
          firstName: message.sender.firstName,
          lastName: message.sender.lastName,
          image: message.sender.image,
        },
        recipient: {
          id: message.recipient.id,
          firstName: message.recipient.firstName,
          lastName: message.recipient.lastName,
          image: message.recipient.image,
        },
      };
    });
    return mapMessages;
  } catch (err) {
    console.log(err);
  }
};

export async function getMessagesByContainer(container: string) {
  try {
    const user = await getUser();
    if (!user) return;

    const selector = container === "inbox" ? "receiverId" : "senderId";

    const messages = await prisma.message.findMany({
      where: {
        [selector]: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        dateSeen: true,
        senderId: true,
        receiverId: true,

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
    return messages.map((message) => {
      return {
        id: message.id,
        text: message.text,
        createdAt: new Date(message.createdAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
        dateSeen: message.dateSeen,
        senderId: message.senderId,
        recipientId: message.receiverId,
        sender: {
          id: message.sender.id,
          firstName: message.sender.firstName,
          lastName: message.sender.lastName,
          image: message.sender.image,
        },
        recipient: {
          id: message.recipient.id,
          firstName: message.recipient.firstName,
          lastName: message.recipient.lastName,
          image: message.recipient.image,
        },
      };
    });
  } catch (err) {
    console.error(err);
  }
}
