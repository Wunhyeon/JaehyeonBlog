import { z } from "zod";

export const CreateContentFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  mainImg: z.string().nullish(),
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  }),
  contentCategoryId: z.string().uuid(),
});

export type BlogFormSchemaType = z.infer<typeof CreateContentFormSchema>;
