import { dbAppointment } from "@/lib/db-appointment";
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

  const filledForm = await dbAppointment.filledForm.findUnique({
    where: {
      id: "some-id",
    },
  });

  console.log(filledForm);

  // get form data from database

  // fill to pdf form

  const dt = new Date();
  const dtOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formData: ISPRIData = filledForm?.filledWith as unknown as ISPRIData;
  //see prisma/seed.ts for sample data

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
      perwakilan: IRowData;
      jenisPermohonan: IRowData;
      tamggalPermohonan: IRowData;
      namaLengkap: IRowData;
      jenisKelamin: IRowData;
      alias: IRowData;
      tinggiBadan: IRowData;
      tempatLahir: IRowData;
      tanggalLahir: IRowData;
      identitasNomor: IRowData;
      identitasTanggalDikeluarkan: IRowData;
      identitasTempatDikeluarkan: IRowData;
      identitasBerlakuHingga: IRowData;
      pekerjaan: IRowData;
      pekerjaanAlamat: IRowData;
      pekerjaanTelp: IRowData;
      indonesiaAlamat: IRowData;
      indonesiaTelp: IRowData;
      lnAlamat: IRowData;
      lnTelp: IRowData;
      alamatEmail: IRowData;
      statusSipil: IRowData;
      ibuNama: IRowData;
      ibuKewarganegaraan?: IRowData;
      ibuTempatLahir: IRowData;
      ibuTanggalLahir: IRowData;
      ayahNama: IRowData;
      ayahKewarganegaraan?: IRowData;
      ayahTempatLahir: IRowData;
      ayahTanggalLahir: IRowData;
      ortuAlamat: IRowData;
      ortuTelp: IRowData;
      suamiIstriNama?: IRowData;
      suamiIstriTempatLahir?: IRowData;
      suamiIstriTanggalLahir?: IRowData;
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
      darurat2Nama?: IRowData;
      darurat2Alamat?: IRowData;
      darurat2Telp?: IRowData;
      darurat2Hp?: IRowData;
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
      perwakilan: {
        x: 120,
        y: height - 50,
        size: 11,
        maxCharPerRow: 30,
        row: 1,
        value: formData.perwakilan.toUpperCase(),
      },
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
        value: formData.alias?.toUpperCase() || "",
      },
      tinggiBadan: {
        x: 495.5,
        y: height - 315,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.tinggiBadan.toString(),
      },
      tempatLahir: {
        x: 110,
        y: height - 337.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.tempatLahir.toUpperCase(),
      },
      tanggalLahir: {
        x: 465.5,
        y: height - 337.5,
        size: 9,
        maxCharPerRow: 6,
        row: 1,
        value: format(formData.tanggalLahir, "ddMMyy"),
      },
      identitasNomor: {
        x: 110,
        y: height - 362.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.identitasNomor.toUpperCase(),
      },
      identitasTanggalDikeluarkan: {
        x: 465.5,
        y: height - 363.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: format(formData.identitasTanggalDikeluarkan, "ddMMyy"),
      },
      identitasTempatDikeluarkan: {
        x: 110,
        y: height - 387.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.identitasTempatDikeluarkan.toUpperCase(),
      },
      identitasBerlakuHingga: {
        x: 465.5,
        y: height - 387.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: format(formData.identitasBerlakuHingga, "ddMMyy"),
      },
      pekerjaan: {
        x: 110,
        y: height - 412.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.pekerjaan.toUpperCase(),
      },
      pekerjaanAlamat: {
        x: 110,
        y: height - 435,
        size: 9,
        maxCharPerRow: 30,
        maxChar: 43,
        row: 2,
        value: formData.pekerjaanAlamat.toUpperCase(),
      },
      pekerjaanTelp: {
        x: 346.5,
        y: height - 452,
        size: 9,
        maxCharPerRow: 14,
        row: 1,
        value: formData.pekerjaanTelp.toUpperCase(),
      },
      indonesiaAlamat: {
        x: 110,
        y: height - 475,
        size: 9,
        maxCharPerRow: 30,
        maxChar: 43,
        row: 2,
        value: formData.indonesiaAlamat.toUpperCase(),
      },
      indonesiaTelp: {
        x: 346.5,
        y: height - 492,
        size: 9,
        maxCharPerRow: 14,
        row: 1,
        value: formData.indonesiaTelp.toUpperCase(),
      },
      lnAlamat: {
        x: 110,
        y: height - 515,
        size: 9,
        maxCharPerRow: 30,
        maxChar: 43,
        row: 2,
        value: formData.lnAlamat.toUpperCase(),
      },
      lnTelp: {
        x: 346.5,
        y: height - 532,
        size: 9,
        maxCharPerRow: 14,
        row: 1,
        value: formData.lnTelp.toUpperCase(),
      },
      alamatEmail: {
        x: 110,
        y: height - 555,
        size: 9,
        maxCharPerRow: 30,
        row: 1,
        value: formData.alamatEmail.toUpperCase(),
      },
      statusSipil: {
        x: 182.5,
        y: height - 575,
        size: 9,
        maxCharPerRow: 1,
        row: 1,
        value: formData.statusSipil.toUpperCase(),
      },
      ibuNama: {
        x: 110,
        y: height - 602.5,
        size: 9,
        maxCharPerRow: 15,
        row: 1,
        value: formData.ibuNama.toUpperCase(),
      },
      ibuKewarganegaraan: {
        x: 346.5,
        y: height - 602.5,
        size: 9,
        maxCharPerRow: 14,
        row: 1,
        value: formData.ibuKewarganegaraan.toUpperCase(),
      },
      ibuTempatLahir: {
        x: 110,
        y: height - 627.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.ibuTempatLahir.toUpperCase(),
      },
      ibuTanggalLahir: {
        x: 465.5,
        y: height - 627.5,
        size: 9,
        maxCharPerRow: 6,
        row: 1,
        value: format(formData.ibuTanggalLahir, "ddMMyy"),
      },
      ayahNama: {
        x: 110,
        y: height - 650,
        size: 9,
        maxCharPerRow: 15,
        row: 1,
        value: formData.ayahNama.toUpperCase(),
      },
      ayahKewarganegaraan: {
        x: 346.5,
        y: height - 650,
        size: 9,
        maxCharPerRow: 14,
        row: 1,
        value: formData.ayahKewarganegaraan.toUpperCase(),
      },
      ayahTempatLahir: {
        x: 110,
        y: height - 677.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.ayahTempatLahir.toUpperCase(),
      },
      ayahTanggalLahir: {
        x: 465.5,
        y: height - 677.5,
        size: 9,
        maxCharPerRow: 6,
        row: 1,
        value: format(formData.ayahTanggalLahir, "ddMMyy"),
      },
      ortuAlamat: {
        x: 110,
        y: height - 700,
        size: 9,
        maxCharPerRow: 30,
        maxChar: 43,
        row: 2,
        value: formData.ortuAlamat.toUpperCase(),
      },
      ortuTelp: {
        x: 346.5,
        y: height - 715,
        size: 9,
        maxCharPerRow: 14,
        row: 1,
        value: formData.ortuTelp.toUpperCase(),
      },
      suamiIstriNama: {
        x: 110,
        y: height - 740,
        size: 9,
        maxCharPerRow: 30,
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
      suamiIstriTanggalLahir: {
        x: 465.5,
        y: height - 765,
        size: 9,
        maxCharPerRow: 6,
        row: 1,
        value: format(formData.suamiIstriTanggalLahir, "ddMMyy"),
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
      darurat2Nama: {
        x: 52,
        y: height - 267,
        size: 9,
        maxCharPerRow: 30,
        row: 1,
        value: formData.darurat2Nama?.toUpperCase() || "",
      },
      darurat2Alamat: {
        x: 52,
        y: height - 292,
        size: 9,
        maxCharPerRow: 30,
        row: 2,
        value: formData.darurat2Alamat?.toUpperCase() || "",
      },
      darurat2Telp: {
        x: 52,
        y: height - 331,
        size: 9,
        maxCharPerRow: 15,
        row: 1,
        value: formData.darurat2Telp?.toUpperCase() || "",
      },
      darurat2Hp: {
        x: 286,
        y: height - 331,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.darurat2Hp?.toUpperCase() || "",
      },
    };

    const drawText = (pdfPage: PDFPage, text: string, data: IRowData) => {
      const maxChar = data.maxChar || data.row * data.maxCharPerRow;
      const result = text.padEnd(maxChar).split("", maxChar);

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
