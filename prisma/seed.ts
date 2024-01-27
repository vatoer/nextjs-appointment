import { dbAppointment } from "@/lib/db-appointment";
import { ISPRIData, JenisPermohonon } from "@/lib/spri";
import { format } from "date-fns";

async function main() {
  const form = await dbAppointment.form.upsert({
    where: { id: "some-id" },
    update: {},
    create: {
      id: "some-id",
      name: "Some Name",
      description: "Some Description",
      fields: {
        create: [
          {
            id: "some-id",
            name: "Some Name",
            description: "Some Description",
            type: "text",
            required: true,
            options: [],
          },
        ],
      },
      service: {
        create: {
          id: "some-id",
          name: "Some Name",
          description: "Some Description",
          duration: 60,
          price: 100,
        },
      },
    },
  });

  const bookedService = await dbAppointment.bookedService.upsert({
    where: { id: "some-id" },
    update: {},
    create: {
      id: "some-id",
      date: new Date(),
      serviceId: "some-id",
    },
  });

  const spri: ISPRIData = {
    perwakilan: "PARIS",
    jenisPermohonan: JenisPermohonon.BARU_PASPOR_24,
    namaLengkap: "Akhtar prayata aryarahman",
    jenisKelamin: "2",
    alias: "Shinta",
    tinggiBadan: 170,
    tempatLahir: "Jakarta",
    tanggalLahir: new Date("2024-01-27T13:29:34.872Z"),
    identitasNomor: "1234567890",
    identitasTempatDikeluarkan: "Jakarta",
    pekerjaan: "Pegawai Swasta",
    pekerjaanAlamat: "Jl. Jalan No. 1 Jakarta Selatan",
    pekerjaanTelp: "02112345678",
    indonesiaAlamat: "Jl. Jalan No. 1 Jakarta Selatan",
    indonesiaTelp: "62812108670990",
    lnAlamat: "Rue des Bons Enfants No. 1 Paris",
    lnTelp: "081234567890",
    alamatEmail: "email@gmail.com",
    statusSipil: "1",
    ibuNama: "Permata Sari",
    ibuTempatLahir: "Jakarta",
    ayahNama: "Budi Pekerti",
    ayahTempatLahir: "Jakarta",
    ortuAlamat: "Jl. Jalan No. 1 Jakarta Selatan Indonesia raya tercinta",
    suamiIstriNama: "Budi Pekerti Baik Sekali",
    suamiIstriTempatLahir: "Jakarta",
    suamiIstriKewarganegaraan: "Indonesia",
    suamiIstriAlamat: "Jl. Jalan No. 1 Jakarta Selatan",
    darurat1Nama: "Budi Pekerti Baik Sekali",
    darurat1Alamat: "Jl. Jalan No. 1 Jakarta Selatan",
    darurat1Telp: "02112345678",
    darurat1Hp: "081234567890",

    darurat2Nama: "Budi Pekerti Baik Sekali",
    darurat2Alamat: "Jl. Jalan No. 1 Jakarta Selatan",
    darurat2Telp: "02112345678",
    darurat2Hp: "081234567890",

    createdAt: new Date("2024-01-27T13:29:34.872Z"),
    tanggalPermohonan: new Date("2024-01-27T13:29:34.872Z"),
    identitasTanggalDikeluarkan: new Date("2020-01-27T13:29:34.872Z"),
    identitasBerlakuHingga: new Date("2024-01-27T13:29:34.872Z"),
    ibuKewarganegaraan: "Indonesia",
    ibuTanggalLahir: new Date("2024-01-27T13:29:34.872Z"),
    ayahKewarganegaraan: "Prancis",
    ayahTanggalLahir: new Date("2024-01-27T13:29:34.872Z"),
    ortuTelp: "081234567890",
    suamiIstriTanggalLahir: new Date("2024-01-27T13:29:34.872Z"),

    perubahanNama: "Shinta Dewi permata Sari kusuma Dewi",
    perubahanAlamat: "Jl. Jalan No. 1 Jakarta Selatan",
    perubahanLain: "Jl. Jalan No. 1 Jakarta Selatan",
    perubahanTelp: "081234567890",
  };

  const filledForm = await dbAppointment.filledForm.upsert({
    where: { id: "some-id" },
    update: {
      filledWith: spri as any,
    },
    create: {
      id: "some-id",
      formId: "some-id",
      createdAt: new Date(),
      filledBy: "some-id",
      filledWith: spri as any,
      bookedId: "some-id",
    },
  });

  console.log("main");
}

main();
