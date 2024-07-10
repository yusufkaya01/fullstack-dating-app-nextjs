"use server";
import prisma from "@/utils/db";
import { createChatId, pusherServer } from "@/utils/pusher";
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
      createChatId(user.id, recipientId),
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
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            receiverId: user.id,
            recipientDeleted: false,
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

    if (messages.length > 0) {
      // for the first message in the thread, update the dateSeen to the current time

      const readMessageIds = messages
        .filter(
          (m) =>
            m.dateSeen === null &&
            m.senderId === recipientId &&
            m.receiverId === user.id,
        )
        .map((m) => m.id);

      await prisma.message.updateMany({
        where: {
          id: {
            in: readMessageIds,
          },
        },

        data: { dateSeen: new Date() },
      });

      await pusherServer.trigger(
        createChatId(recipientId, user.id),
        "messages:read",
        readMessageIds,
      );
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
        recipientId: message.receiverId,
        sender: {
          id: message.sender.id,
          firstName: message.sender.firstName,
          lastName: message.sender.lastName,
          image: message.sender.image,
          userId: message.sender.userId,
        },
        recipient: {
          id: message.recipient.id,
          firstName: message.recipient.firstName,
          lastName: message.recipient.lastName,
          image: message.recipient.image,
          userId: message.recipient.userId,
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

    const conditions = {
      [container === "outbox" ? "senderId" : "receiverId"]: user.id,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    console.log(`Fetching messages for ${container}`);
    console.log(`Conditions:`, conditions);

    const messages = await prisma.message.findMany({
      where: conditions,
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

    console.log(`Fetched ${messages.length} messages`);

    return messages
      .map((message) => {
        // Check for null sender or recipient
        if (!message.sender || !message.recipient) {
          console.error("Missing sender or recipient for message:", message);
          return null; // or handle accordingly
        }

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
          recipientId: message.receiverId,
          sender: {
            id: message.sender.id,
            firstName: message.sender.firstName,
            lastName: message.sender.lastName,
            image: message.sender.image,
            userId: message.sender.userId,
          },
          recipient: {
            id: message.recipient.id,
            firstName: message.recipient.firstName,
            lastName: message.recipient.lastName,
            image: message.recipient.image,
            userId: message.recipient.userId,
          },
        };
      })
      .filter((message) => message !== null); // Remove null messages
  } catch (err) {
    console.error(err);
  }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";

  try {
    const user = await getUser();

    if (!user) return;

    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });

    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: user.id,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            receiverId: user.id,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messagesToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messagesToDelete.map((m) => ({ id: m.id })),
        },
      });
    }

    revalidatePath(`/messages?container=${isOutbox ? "outbox" : "inbox"}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
