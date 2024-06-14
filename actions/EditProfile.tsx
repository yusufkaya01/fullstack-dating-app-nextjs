"use server";
import prisma from "@/utils/db";
import { getUser } from "@/utils/user";
import { editProfileSchema } from "@/utils/zodschema";
import { revalidatePath, revalidateTag } from "next/cache";

let data;

export const EditProfile = async (prev: any, formData: FormData) => {
  try {
    data = editProfileSchema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      city: formData.get("city"),
      description: formData.get("description"),
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
    const updatedMember = await prisma.member.update({
      where: {
        userId: user?.id,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        description: data.description,
      },
    });
    revalidateTag(`member:${user.id}`);

    revalidateTag("members");

    //with these revalidatePath calls, we can revalidate the cache of the page
    revalidatePath("/members/edit");

    return updatedMember;
  } catch (err: any) {
    console.error(err);
    return {
      message: err.message,
      errors: err.errors,
    };
  }
};
