import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

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
    namaAyahWali: "Budi Pekerti Baik Sekali",
    statusPerkawinanOrtu: "Menikah",
    jenisKelamin: "Perempuan",
    namaAnak: "Shinta Dewi",
    ttl: "Jakarta, 12-12-1990",
    namaAyah: "Budi Pekerti",
    kewarganegaraanIbu: "Indonesia",
    namaIbuWali: "Permata Sari",
    kewarganegaraanAyah: "Perancis",
    namaIbu: "Permata Sari",
    nomorPaspor: "1234567890",
    createdAt: dt.toLocaleDateString("id-ID", dtOptions),
    alamat: "Jl. Jalan No. 1 Jakarta Selatan",
    namaLengkap: "Shinta Dewi",
  };

  try {
    const pdfDoc = await PDFDocument.load(
      await readFile("./pdf-template/form-wn-ganda.pdf")
    );

    const form = pdfDoc.getForm();

    const fields = form.getFields().map((field) => field.getName());
    console.log(fields);

    for (const [key, value] of Object.entries(formData)) {
      console.log(`${key}: ${value}`);
      form.getTextField(key).setText(value);
      form.getTextField(key).setFontSize(11);
    }

    form.flatten();

    const pdfBytes = await pdfDoc.save();
    //await writeFile("./pdf-template/f1ex.pdf", pdfBytes);
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        //"Content-Disposition": 'attachment; filename="f1.pdf"',
      },
    });
  } catch (error) {
    console.log(error);
  }

  return new NextResponse("hello world", { status: 200 });
}
