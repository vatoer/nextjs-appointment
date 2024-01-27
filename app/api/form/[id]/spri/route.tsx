import { ISPRIData, JenisPermohonon } from "@/lib/spri";
import { format } from "date-fns/format";
import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { PDFDocument, PDFPage, StandardFonts } from "pdf-lib";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id);

  // get form data from database

  // fill to pdf form

  const dt = new Date();
  const dtOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formData: ISPRIData = {
    jenisPermohonan: JenisPermohonon.BARU_PASPOR_48,
    namaLengkap: "Shinta Dewi permata Sari kusuma Dewi",
    jenisKelamin: "2",
    alias: "Shinta",
    tempatLahir: "Jakarta",
    identitasNomor: "1234567890",
    identitasDikeluarkan: "Jakarta",
    pekerjaan: "Pegawai Swasta",
    alamatPekerjaan: "Jl. Jalan No. 1 Jakarta Selatan",
    alamatIndonesia: "Jl. Jalan No. 1 Jakarta Selatan",
    alamatAsing: "Rue des Bons Enfants No. 1 Paris",
    alamatEmail: "email@gmail.com",
    statusSipil: "1",

    ibuNama: "Permata Sari",
    ibuTempatLahir: "Jakarta",

    ayahNama: "Budi Pekerti",
    ayahTempatLahir: "Jakarta",

    ortuAlamat: "Jl. Jalan No. 1 Jakarta Selatan",

    suamiIstriNama: "Budi Pekerti Baik Sekali",
    suamiIstriTempatLahir: "Jakarta",
    suamiIstriKewarganegaraan: "Indonesia",
    suamiIstriAlamat: "Jl. Jalan No. 1 Jakarta Selatan",

    darurat1Nama: "Budi Pekerti Baik Sekali",
    darurat1Alamat: "Jl. Jalan No. 1 Jakarta Selatan",
    darurat1Telp: "02112345678",
    darurat1Hp: "081234567890",

    createdAt: new Date(),
    tanggalPermohonan: new Date(),
    identitasTanggalDikeluarkan: new Date(),
    identitasBerlakuHingga: new Date(),
    ibuKewarganegaraan: "",
    ibuTanggalLahir: new Date(),
    ayahKewarganegaraan: "",
    ayahTanggalLahir: new Date(),
    ortuTelp: "",
    suamiIstriTanggalLahir: new Date(),
  };

  try {
    const pdfDoc = await PDFDocument.load(
      await readFile("./pdf-template/form-spri.pdf")
    );

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const secondPage = pages[1];
    const { width, height } = firstPage.getSize();

    interface IRowData {
      x: number;
      y: number;
      size: number;
      maxChar?: number;
      maxCharPerRow: number;
      row: number;
      value: string;
    }

    interface IFormData {
      jenisPermohonan: IRowData;
      tamggalPermohonan: IRowData;
      namaLengkap: IRowData;
      jenisKelamin: IRowData;
      alias: IRowData;
      tempatLahir: IRowData;
      identitasNomor: IRowData;
      identitasDikeluarkan: IRowData;
      pekerjaan: IRowData;
      alamatPekerjaan: IRowData;
      alamatIndonesia: IRowData;
      alamatAsing: IRowData;
      alamatEmail: IRowData;
      statusSipil: IRowData;
      ibuNama: IRowData;
      ibuTempatLahir: IRowData;
      ayahNama: IRowData;
      ayahTempatLahir: IRowData;
      ortuAlamat: IRowData;
      suamiIstriNama?: IRowData;
      suamiIstriTempatLahir?: IRowData;
      suamiIstriKewarganegaraan?: IRowData;
      suamiIstriAlamat?: IRowData;
    }

    interface IFormDataPage2 {
      perubahanNama: IRowData;
      perubahanAlamat: IRowData;
      perubahanTelp: IRowData;
      darurat1Nama: IRowData;
      darurat1Alamat: IRowData;
      darurat1Telp: IRowData;
      darurat1Hp: IRowData;
      kontakDarurat2?: IRowData;
      alamatKontakDarurat2?: IRowData;
      telpKontakDarurat2?: IRowData;
      hpKontakDarurat2?: IRowData;
    }

    const pointYJenisPermohonan = (jenis: JenisPermohonon): number => {
      switch (jenis.charAt(0)) {
        case "B":
          return 228.5;
        case "C":
          return 243.5;
        default:
          return 213.5;
      }
    };

    const formDataSpriPage1: IFormData = {
      jenisPermohonan: {
        x: 195,
        y: height - pointYJenisPermohonan(formData.jenisPermohonan),
        size: 9,
        maxCharPerRow: 1,
        row: 1,
        value: formData.jenisPermohonan.charAt(1),
      },
      tamggalPermohonan: {
        x: 463,
        y: height - 213.5,
        size: 9,
        maxCharPerRow: 8,
        row: 1,
        value: format(formData.createdAt, "ddMMyy"),
      },
      namaLengkap: {
        x: 110,
        y: height - 275,
        size: 9,
        maxCharPerRow: 24,
        row: 2,
        value: formData.namaLengkap.toUpperCase(),
      },
      jenisKelamin: {
        x: 477.5,
        y: height - 275,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.jenisKelamin.toUpperCase(),
      },
      alias: {
        x: 110,
        y: height - 315,
        size: 9,
        maxCharPerRow: 25,
        row: 1,
        value: formData.alias.toUpperCase(),
      },
      tempatLahir: {
        x: 110,
        y: height - 337.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.tempatLahir.toUpperCase(),
      },
      identitasNomor: {
        x: 110,
        y: height - 362.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.identitasNomor.toUpperCase(),
      },
      identitasDikeluarkan: {
        x: 110,
        y: height - 387.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.identitasDikeluarkan.toUpperCase(),
      },
      pekerjaan: {
        x: 110,
        y: height - 412.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.pekerjaan.toUpperCase(),
      },
      alamatPekerjaan: {
        x: 110,
        y: height - 435,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.alamatPekerjaan.toUpperCase(),
      },
      alamatIndonesia: {
        x: 110,
        y: height - 475,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.alamatIndonesia.toUpperCase(),
      },
      alamatAsing: {
        x: 110,
        y: height - 515,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.alamatAsing.toUpperCase(),
      },
      alamatEmail: {
        x: 110,
        y: height - 555,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.alamatEmail.toUpperCase(),
      },
      statusSipil: {
        x: 182.5,
        y: height - 575,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.statusSipil.toUpperCase(),
      },
      ibuNama: {
        x: 110,
        y: height - 602.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.ibuNama.toUpperCase(),
      },
      ibuTempatLahir: {
        x: 110,
        y: height - 627.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.ibuTempatLahir.toUpperCase(),
      },
      ayahNama: {
        x: 110,
        y: height - 650,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.ayahNama.toUpperCase(),
      },
      ayahTempatLahir: {
        x: 110,
        y: height - 677.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.ayahTempatLahir.toUpperCase(),
      },
      ortuAlamat: {
        x: 110,
        y: height - 700,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.ortuAlamat.toUpperCase(),
      },
      suamiIstriNama: {
        x: 110,
        y: height - 740,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.suamiIstriNama?.toUpperCase(),
      },
      suamiIstriTempatLahir: {
        x: 110,
        y: height - 765,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.suamiIstriTempatLahir?.toUpperCase(),
      },
      suamiIstriKewarganegaraan: {
        x: 110,
        y: height - 790,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.suamiIstriKewarganegaraan?.toUpperCase(),
      },
      suamiIstriAlamat: {
        x: 110,
        y: height - 815,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.suamiIstriAlamat,
      },
    };

    const formDataSpriPage2: IFormDataPage2 = {
      perubahanNama: {
        x: 52,
        y: height - 85,
        size: 9,
        maxCharPerRow: 30,
        row: 1,
        value: formData.perubahanNama?.toUpperCase() || "",
      },
      perubahanAlamat: {
        x: 52,
        y: height - 110,
        size: 9,
        maxCharPerRow: 30,
        maxChar: 38,
        row: 2,
        value: formData.perubahanAlamat?.toUpperCase() || "",
      },
      perubahanTelp: {
        x: 286,
        y: height - 127,
        size: 9,
        maxCharPerRow: 14,
        row: 1,
        value: formData.perubahanTelp?.toUpperCase() || "",
      },
      darurat1Nama: {
        x: 52,
        y: height - 173,
        size: 9,
        maxCharPerRow: 30,
        row: 1,
        value: formData.darurat1Nama.toUpperCase(),
      },
      darurat1Alamat: {
        x: 52,
        y: height - 197,
        size: 9,
        maxCharPerRow: 30,
        row: 2,
        value: formData.darurat1Alamat.toUpperCase(),
      },
      darurat1Telp: {
        x: 52,
        y: height - 236,
        size: 9,
        maxCharPerRow: 15,
        row: 1,
        value: formData.darurat1Telp.toUpperCase(),
      },
      darurat1Hp: {
        x: 286,
        y: height - 236,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.darurat1Hp.toUpperCase(),
      },
    };

    const drawText = (pdfPage: PDFPage, text: string, data: IRowData) => {
      const result = text.padEnd(data.row * data.maxCharPerRow).split("");

      let rowsOfChars: string[][] = [];
      for (let i = 0; i < data.row; i++) {
        rowsOfChars.push(
          result.slice(i * data.maxCharPerRow, (i + 1) * data.maxCharPerRow)
        );
      }

      Array(data.row)
        .fill(null)
        .map((_, index) => {
          const row = rowsOfChars[index];
          const y = data.y - index * 14.75;
          row.map((char, index) => {
            const x = data.x + index * 14.75;
            pdfPage.drawText(char.toUpperCase(), {
              x,
              y,
              size: data.size,
              font: helveticaFont,
            });
          });
        });
    };

    for (const [key, value] of Object.entries(formDataSpriPage1)) {
      drawText(firstPage, value.value, value);
    }

    for (const [key, value] of Object.entries(formDataSpriPage2)) {
      drawText(secondPage, value.value, value);
    }

    const pdfBytes = await pdfDoc.save();
    //await writeFile("./pdf-template/spriedited.pdf", pdfBytes);

    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.log(error);
  }

  return new NextResponse("hello world", { status: 200 });
}
