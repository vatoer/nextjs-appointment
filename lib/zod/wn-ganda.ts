import { toZod } from "tozod";
import z, { addIssueToContext } from "zod";

export const wnGandaSchema = z.object({
  tempatLahir: z
    .string()
    .min(3, { message: "Tempat lahir tidak boleh kosong" }),
  tanggalLahir: z.date().refine(
    (date) => {
      return date < new Date();
    },
    { message: "Tanggal lahir tidak boleh lebih dari hari ini" }
  ),
});
