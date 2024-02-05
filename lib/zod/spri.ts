//https://transform.tools/typescript-to-zod
import { toZod } from "tozod";
import z, { addIssueToContext } from "zod";
import { JenisPermohonon, StatusSipil, TSpri } from "../spri";

export const jenisPermohononSchema = z.nativeEnum(JenisPermohonon, {
  errorMap: (issue, ctx) => ({ message: "Pilih Jenis Permohonan" }),
});

export const statusSipilSchema = z.nativeEnum(StatusSipil, {
  errorMap: (issue, ctx) => ({ message: "Pilih status Sipil" }),
});

export const genericStringSchema = z.string().min(3).max(25);

export const genericTanggalSchema = z
  .string()
  .min(10, {
    message: "Please input with format dd-mm-yyyy",
  })
  .pipe(
    z.coerce
      .date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
      })
      .min(new Date("1900-01-01"), { message: "Too old" })
  );

export const perubahanNamaSchema = z.string().min(3).max(25);

export const spriSchema = z
  .object({
    jenisPermohonan: jenisPermohononSchema,
    namaLengkap: z.string().min(3),
    jenisKelamin: z.enum(["1", "2"], {
      errorMap: (issue, ctx) => ({ message: "Pilih Jenis kelamin" }),
    }),
    alias: z.string().min(3).max(25),
    tinggiBadan: z.coerce.number().min(20).max(250),
    tempatLahir: z.string().min(3),
    tanggalLahir: genericTanggalSchema,
    identitasNomor: z.string().min(5).max(16), // asumsi KTP
    identitasTanggalDikeluarkan: z.coerce.date(),
    identitasTempatDikeluarkan: z.string().min(3),
    identitasBerlakuHingga: z.coerce.date(),
    pekerjaan: z.string().min(3),
    pekejerjaanAlamat: z.string().min(10),
    pekerjaanTelp: z.string(),
    IndonesiaAlamat: z.string().min(10),
    IndonesiaTelp: z.string(),
    lnAlamat: z.string().min(10),
    lnTelp: z.string(),
    alamatEmail: z.string().email(),
    statusSipil: statusSipilSchema,
    ibuNama: z.string().min(3),
    ibuKewarganegaraan: z.string().min(3),
    ibuTempatLahir: z.string().min(3),
    ibuTanggalLahir: z.coerce.date(),
    ayahNama: z.string().min(3),
    ayahKewarganegaraan: z.string().min(3),
    ayahTempatLahir: z.string().min(3),
    ayahTanggalLahir: z.coerce.date(),
    ortuAlamat: z.string().min(10),
    ortuTelp: z.string(),
    suamiIstriNama: z.string(),
    suamiIstriTempatLahir: z.string().optional(),
    suamiIstriTanggalLahir: z.coerce.date().optional(),
    suamiIstriKewarganegaraan: z.string().optional(),
    suamiIstriAlamat: z.string().optional(),
    perubahanNama: z.string().optional(),
    perubahanAlamat: z.string().optional(),
    perubahanTelp: z.string().optional(),
    darurat1Nama: z.string(),
    darurat1Alamat: z.string(),
    darurat1Telp: z.string(),
    darurat1Hp: z.string(),
    darurat2Nama: z.string(),
    darurat2Alamat: z.string(),
    darurat2Telp: z.string(),
    darurat2Hp: z.string(),
  })
  .superRefine(
    (
      { tanggalLahir, jenisPermohonan, perubahanNama, perubahanAlamat },
      ctx
    ) => {
      console.log("tanggalLahir", tanggalLahir);
      if (jenisPermohonan.charAt(0) === "C") {
        if (perubahanNama === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Data tidak valid`,
            path: ["perubahanNama"],
          });
          return false;
        }

        const checkPerubahanNama = perubahanNamaSchema.safeParse(perubahanNama);

        console.log("checkPerubahanNama", checkPerubahanNama);

        if (checkPerubahanNama.success === false) {
          checkPerubahanNama.error.issues.forEach((issue) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: issue.message,
              path: ["perubahanNama"],
            });
          });
          // ctx.addIssue({
          //   code: z.ZodIssueCode.custom,
          //   message: `Data tidak valid lagi`,
          //   path: ["perubahanNama"],
          // });
          return false;
        }
      }

      return z.NEVER;
    }
  );
// .refine(
//   (data) => {
//     if (
//       data.jenisPermohonan.charAt(0) === "C" &&
//       data.perubahanNama !== undefined &&
//       data.perubahanNama.length < 3
//     ) {
//       return false;
//     }
//     return true;
//   },
//   {
//     message: "Data tidak valid",
//     path: ["perubahanNama"],
//   }
// );
