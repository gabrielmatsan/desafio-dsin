import z from "zod";

export const getWeeklyStatsDto = z.object({
  date: z.coerce.date(),
});

export type GetWeeklyStatsDto = z.infer<typeof getWeeklyStatsDto>;
