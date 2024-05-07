import { z } from 'zod';

export const responseSchema = z.object({
  text: z.string()
});

export type Response = z.infer<typeof responseSchema>;
