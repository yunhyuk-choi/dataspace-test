import { z } from "zod";

export const signInSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export type SignInFormType = z.infer<typeof signInSchema>;
