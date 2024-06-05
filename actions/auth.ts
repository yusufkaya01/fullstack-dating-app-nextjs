"use server";
import { cookies } from "next/headers";
import { signin, signup } from "@/utils/authDb";
import { redirect } from "next/navigation";
import { COOKIE_NAME } from "@/utils/constants";
import { loginSchema, registerSchema } from "@/utils/zodschema";
import { getUser } from "@/utils/user";

export const registerUser = async (prevState: any, formData: FormData) => {
  let data;
  try {
    data = registerSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    });
  } catch (err: any) {
    console.error(err);
    return { message: "Invalid data", errors: err.errors };
  }

  try {
    const { token } = await signup(data);
    cookies().set(COOKIE_NAME, token);
  } catch (e: any) {
    console.error("message", e.code);
    return { message: "Failed to sign you up", errors: e.errors, code: e.code };
  }
  redirect("/");
};

export const signinUser = async (prevState: any, formData: FormData) => {
  let data;
  try {
    data = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (err: any) {
    console.error(err);
    return { message: "Invalid data", errors: err.errors };
  }

  try {
    const { token } = await signin(data);
    cookies().set(COOKIE_NAME, token);
  } catch (err: any) {
    console.error(err.message);
    return { message: err.message, errors: err.errors };
  }
  redirect("/");
};
