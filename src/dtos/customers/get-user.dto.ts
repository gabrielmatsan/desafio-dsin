import z from "zod";

const getUserDTO = z.object({
  id: z.string(),
});
