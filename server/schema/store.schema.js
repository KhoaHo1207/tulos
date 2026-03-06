import { z } from "zod";

export const createStoreSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone must be at least 10 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  image: z.string().min(1, { message: "Image is required" }),
});

export const updateStoreSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .optional(),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters long" })
    .optional(),
  phone: z
    .string()
    .min(10, { message: "Phone must be at least 10 characters long" })
    .optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  image: z.string().min(1, { message: "Image is required" }).optional(),
});
