import { z } from "zod";

export const signUpSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  avatar_file: z.any().optional(),
});
