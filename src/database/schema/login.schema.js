import { z } from "zod";

export const loginSchema = z
  .object({
    username: z.string().min(4).max(20),
    password: z
      .string()
      .min(6)
      .max(16)
      .regex(/^[a-z0-9]*$/i, {
        message:
          "Password must contain only lowercase letters and numbers min 6 max 16 length",
      }),
  })
  .required({
    username: true,
    password: true
  });
