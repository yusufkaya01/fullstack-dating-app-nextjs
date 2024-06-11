import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must have at least 6 characters",
  }),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must have at least 2 characters",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must have at least 2 characters",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must have at least 6 characters",
  }),
});

export const editProfileSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must have at least 2 characters",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must have at least 2 characters",
  }),
  city: z.string().min(2, {
    message: "City must have at least 2 characters",
  }),
  description: z.string().min(2, {
    message: "Description must have at least 2 characters",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type EditSchema = z.infer<typeof editProfileSchema>;
