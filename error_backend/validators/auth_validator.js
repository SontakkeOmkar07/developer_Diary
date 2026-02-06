import { z } from "zod";

//signup
export const signUpSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must not be more than 255 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .min(10, { message: "Phone must be at least 10 digits" })
    .max(15, { message: "Phone must not exceed 15 digits" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password must be at least 3 characters" }),
});

//login
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
