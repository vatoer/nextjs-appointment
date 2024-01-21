import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

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

  const formData = {
    namaLengkap: "Shinta Dewi permata Sari kusuma Dewi",
    jenisKelamin: "2",
    alias: "Shinta",
    tempatLahir: "Jakarta",
    nomorIdentitas: "1234567890",
    tempatDikeluarkan: "Jakarta",
    pekerjaan: "Pegawai Swasta",
    alamatPekerjaan: "Jl. Jalan No. 1 Jakarta Selatan",
    alamatIndonesia: "Jl. Jalan No. 1 Jakarta Selatan",
    alamatAsing: "Rue des Bons Enfants No. 1 Paris",
    alamatEmail: "email@gmail.com",
    statusSipil: "1",

    namaIbu: "Permata Sari",
    tempatLahirIbu: "Jakarta",

    namaAyah: "Budi Pekerti",
    tempatLahirAyah: "Jakarta",

    alamatOrtu: "Jl. Jalan No. 1 Jakarta Selatan",

    namaSuamiIstri: "Budi Pekerti Baik Sekali",
    tempatLahirSuamiIstri: "Jakarta",
    kewarganegaraanSuamiIstri: "Indonesia",
    alamatSuamiIstri: "Jl. Jalan No. 1 Jakarta Selatan",

    namaAyahWali: "Budi Pekerti Baik Sekali",
    statusPerkawinanOrtu: "Menikah",
    namaAnak: "Shinta Dewi",
    ttl: "Jakarta, 12-12-1990",
    kewarganegaraanIbu: "Indonesia",
    namaIbuWali: "Permata Sari",
    kewarganegaraanAyah: "Perancis",
    nomorPaspor: "1234567890",
    createdAt: dt.toLocaleDateString("id-ID", dtOptions),
    alamat: "Jl. Jalan No. 1 Jakarta Selatan",
  };

  try {
    const pdfDoc = await PDFDocument.load(
      await readFile("./pdf-template/form-spri.pdf")
    );

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
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
      namaLengkap: IRowData;
      jenisKelamin: IRowData;
      alias: IRowData;
      tempatLahir: IRowData;
      nomorIdentitas: IRowData;
      tempatDikeluarkan: IRowData;
      pekerjaan: IRowData;
      alamatPekerjaan: IRowData;
      alamatIndonesia: IRowData;
      alamatAsing: IRowData;
      alamatEmail: IRowData;
      statusSipil: IRowData;
      namaIbu: IRowData;
      tempatLahirIbu: IRowData;
      namaAyah: IRowData;
      tempatLahirAyah: IRowData;
      alamatOrtu: IRowData;
      namaSuamiIstri?: IRowData;
      tempatLahirSuamiIstri?: IRowData;
      kewarganegaraanSuamiIstri?: IRowData;
      alamatSuamiIstri?: IRowData;
    }

    interface IFormData2 {
      nama: IRowData;
      alamat: IRowData;
      telp: IRowData;
    }

    const formDataSpri: IFormData = {
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
      nomorIdentitas: {
        x: 110,
        y: height - 362.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.nomorIdentitas.toUpperCase(),
      },
      tempatDikeluarkan: {
        x: 110,
        y: height - 387.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.tempatDikeluarkan.toUpperCase(),
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
      namaIbu: {
        x: 110,
        y: height - 602.5,
        size: 9,
        maxCharPerRow: 23,
        row: 1,
        value: formData.namaIbu.toUpperCase(),
      },
        tempatLahirIbu: {
            x: 110,
            y: height - 627.5,
            size: 9,
            maxCharPerRow: 23,
            row: 1,
            value: formData.tempatLahirIbu.toUpperCase(),
        },
        namaAyah: {
            x: 110,
            y: height - 650,
            size: 9,
            maxCharPerRow: 23,
            row: 1,
            value: formData.namaAyah.toUpperCase(),
        },
        tempatLahirAyah: {
            x: 110,
            y: height - 677.5,
            size: 9,
            maxCharPerRow: 23,
            row: 1,
            value: formData.tempatLahirAyah.toUpperCase(),
        },
        alamatOrtu: {
            x: 110,
            y: height - 700,
            size: 9,
            maxCharPerRow: 23,
            row: 1,
            value: formData.alamatOrtu.toUpperCase(),
        },
        namaSuamiIstri: {
            x: 110,
            y: height - 740,
            size: 9,
            maxCharPerRow: 23,
            row: 1,
            value: formData.namaSuamiIstri?.toUpperCase(),
        },
        tempatLahirSuamiIstri: {
            x: 110,
            y: height - 765,
            size: 9,
            maxCharPerRow: 23,
            row: 1,
            value: formData.tempatLahirSuamiIstri?.toUpperCase(),
        },
        kewarganegaraanSuamiIstri: {
            x: 110,
            y: height - 790,
            size: 9,
            maxCharPerRow: 23,
            row: 1,
            value: formData.kewarganegaraanSuamiIstri?.toUpperCase(),
        },
        alamatSuamiIstri: {
            x: 110,
            y: height - 815,
            size: 9,
            maxCharPerRow: 23,
            row: 1,
            value: formData.alamatSuamiIstri?.toUpperCase(),
        },


    };

    //const formDataSpri2: IFormData = {};

    const drawText = (text: string, data: IRowData) => {
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
            firstPage.drawText(char.toUpperCase(), {
              x,
              y,
              size: data.size,
              font: helveticaFont,
            });
          });
        });
    };

    for (const [key, value] of Object.entries(formDataSpri)) {
      drawText(value.value, value);
    }

    const pdfBytes = await pdfDoc.save();
    await writeFile("./pdf-template/spriedited.pdf", pdfBytes);
  } catch (error) {
    console.log(error);
  }

  return new NextResponse("hello world", { status: 200 });
}
