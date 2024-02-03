//https://transform.tools/typescript-to-zod
import { toZod } from "tozod";
import z from "zod";
import { JenisPermohonon, StatusSipil, TSpri } from "../spri";

export const jenisPermohononSchema = z.nativeEnum(JenisPermohonon, {
  errorMap: (issue, ctx) => ({ message: "Pilih Jenis Permohonan" }),
});

export const statusSipilSchema = z.nativeEnum(StatusSipil, {
  errorMap: (issue, ctx) => ({ message: "Pilih status Sipil" }),
});

export const spriSchema = z.object({
  jenisPermohonan: jenisPermohononSchema,
  namaLengkap: z.string().min(3),
  jenisKelamin: z.enum(["1", "2"], {
    errorMap: (issue, ctx) => ({ message: "Pilih Jenis kelamin" }),
  }),
  alias: z.string().min(3).max(25),
  tinggiBadan: z.coerce.number().min(20).max(250),
  tempatLahir: z.string().min(3),
  tanggalLahir: z.coerce.date(),
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
  suamiIstriTempatLahir: z.string(),
  suamiIstriTanggalLahir: z.coerce.date().optional().or(z.literal("")),
  suamiIstriKewarganegaraan: z.string(),
  suamiIstriAlamat: z.string(),
  perubahanNama: z.string(),
  perubahanAlamat: z.string(),
  perubahanTelp: z.string(),
  darurat1Nama: z.string(),
  darurat1Alamat: z.string(),
  darurat1Telp: z.string(),
  darurat1Hp: z.string(),
  darurat2Nama: z.string(),
  darurat2Alamat: z.string(),
  darurat2Telp: z.string(),
  darurat2Hp: z.string(),
});
