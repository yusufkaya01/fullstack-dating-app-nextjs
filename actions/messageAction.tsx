"use server";
import prisma from "@/utils/db";
import { getUser } from "@/utils/user";
import { messageSchema } from "@/utils/zodschema";

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
  } catch (err: any) {
    console.error(err);
    return {
      message: err.message,
      errors: err.errors,
    };
  }
};
