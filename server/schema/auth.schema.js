import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" }),
  phone: z
    .string()
    .length(10, { message: "Phone number must be 10 digits long" }),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters long" }),
  avatar_url: z.string().url({ message: "Invalid avatar URL" }).optional(),
});

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.safeParse(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    next();
  };
};
