export enum JenisPermohonon {
  "BARU_PASPOR_48" = "A1",
  "BARU_PASPOR_24" = "A2",
  "BARU_SPLP" = "A3",
  "GANTI_HABIS" = "B1",
  "GANTI_PENUH" = "B2",
  "GANTI_HILANG" = "B3",
  "GANTI_RUSAK" = "B4",
  "GANTI_LAIN" = "B5",
  "PERUBAHAN_NAMA" = "C1",
  "PERUBAHAN_ALAMAT" = "C2",
  "PERUBAHAN_LAIN" = "C3",
}

export interface ISPRIData {
  perwakilan: string; // PARIS
  jenisPermohonan: JenisPermohonon;
  tanggalPermohonan: Date;
  namaLengkap: string;
  jenisKelamin: string;
  alias?: string;
  tinggiBadan: number;
  tempatLahir: string;
  tanggalLahir: Date;

  identitasNomor: string;
  identitasTempatDikeluarkan: string;
  identitasTanggalDikeluarkan: Date;
  identitasBerlakuHingga: Date;

  pekerjaan: string;
  pekerjaanAlamat: string;
  pekerjaanTelp: string;

  indonesiaAlamat: string;
  indonesiaTelp: string;
  lnAlamat: string;
  lnTelp: string;
  alamatEmail: string;
  statusSipil: string;

  ibuNama: string;
  ibuKewarganegaraan: string;
  ibuTempatLahir: string;
  ibuTanggalLahir: Date;

  ayahNama: string;
  ayahKewarganegaraan: string;
  ayahTempatLahir: string;
  ayahTanggalLahir: Date;

  ortuAlamat: string;
  ortuTelp: string;

  suamiIstriNama: string;
  suamiIstriKewarganegaraan: string;
  suamiIstriTempatLahir: string;
  suamiIstriTanggalLahir: Date;
  suamiIstriAlamat: string;

  perubahanNama?: string;
  perubahanAlamat?: string;
  perubahanLain?: string;
  perubahanTelp?: string;

  darurat1Nama: string;
  darurat1Alamat: string;
  darurat1Telp: string;
  darurat1Hp: string;

  darurat2Nama?: string;
  darurat2Alamat?: string;
  darurat2Telp?: string;
  darurat2Hp?: string;

  petugasYangMenyerahkan?: string;
  petugasYangMenerima?: string;

  createdAt: Date;
}
