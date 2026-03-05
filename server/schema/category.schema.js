import { z } from "zod";

export const createCategorySchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),

  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  image: z.string().url({ message: "Invalid image URL" }).optional(),
});

export const updateCategorySchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .optional(),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .optional(),
  image: z.string().url({ message: "Invalid image URL" }).optional(),
});
