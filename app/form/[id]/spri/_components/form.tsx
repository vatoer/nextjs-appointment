"use client";
import FormRow from "@/app/form/_components/form-row";
import InputForm from "@/app/form/_components/input-form";
import SelectForm from "@/app/form/_components/select-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { JenisPermohonon, StatusSipil } from "@/lib/spri";
import { spriSchema } from "@/lib/zod/spri";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof spriSchema>;

const SpriForm = () => {
  const [jenisPermohonan, setJenisPermohonan] = useState<JenisPermohonon>(
    "0" as JenisPermohonon
  );

  const [statusSipil, setStatusSipil] = useState(0);

  //setJenisPermohonan("C1");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isDirty,
      isValid,
      isSubmitted,
    },
  } = useForm<FormData>({
    resolver: zodResolver(spriSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("oie");
    console.log(data);
  };

  return (
    <div className="py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
        noValidate
      >
        <FormRow>
          <SelectForm
            label="Jenis Permohonan"
            name="jenisPermohonan"
            error={errors.jenisPermohonan}
            register={register}
            //value={jenisPermohonan}
            onChange={(e) =>
              setJenisPermohonan(e.target.value as JenisPermohonon)
            }
          >
            <option value="0">Pilih Jenis Permohonan</option>
            <option value="A1">Pembuatan Paspor Baru 48 Halaman</option>
            <option value="A2">Pembuatan Paspor Baru 24 Halaman</option>
            <option value="A3">Pembuatan SPLP</option>
            <option value="B1">
              Pergantian Paspor karena habis masa berlaku
            </option>
            <option value="B2">Pergantian Paspor karena penuh</option>
            <option value="B3">Pergantian Paspor karena hilang</option>
            <option value="B4">Pergantian Paspor karena rusak</option>
            <option value="C1">Perubahan Nama</option>
            <option value="C2">Perubahan Alamat</option>
            <option value="C3">Perubahan Lain</option>
          </SelectForm>
        </FormRow>
        <FormRow>
          <InputForm
            label="namaLengkap"
            register={register}
            name="namaLengkap"
            error={errors.namaLengkap}
            className="md:w-9/12"
          />
          <SelectForm
            label="Jenis Kelamin"
            name="jenisKelamin"
            error={errors.jenisKelamin}
            register={register}
            className="md:w-3/12"
          >
            <option value="0">Pilih Jenis Kelamin</option>
            <option value="1">Laki-laki</option>
            <option value="2">Perempuan</option>
          </SelectForm>
        </FormRow>
        <FormRow>
          <InputForm
            label="Alias"
            register={register}
            name="alias"
            error={errors.alias}
            className="md:w-3/4"
          />
          <InputForm
            label="Tinggi Badan (cm)"
            register={register}
            name="tinggiBadan"
            error={errors.tinggiBadan}
            className="md:w-1/4"
            pattern="[0-9]*"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Tempat Lahir"
            register={register}
            name="tempatLahir"
            error={errors.tempatLahir}
            className="md:w-2/3"
          />
          <InputForm
            label="Tanggal Lahir"
            register={register}
            name="tanggalLahir"
            error={errors.tanggalLahir}
            className="md:w-1/3"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Nomor Identitas"
            register={register}
            name="identitasNomor"
            error={errors.identitasNomor}
            className="md:w-2/3"
            maxLength={16}
          />
          <InputForm
            label="Tanggal dikeluarkan"
            register={register}
            name="identitasTanggalDikeluarkan"
            error={errors.identitasTanggalDikeluarkan}
            className="md:w-1/3"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Tempat dikeluarkan"
            register={register}
            name="identitasTempatDikeluarkan"
            error={errors.identitasTempatDikeluarkan}
            className="md:w-2/3"
          />
          <InputForm
            label="Berlaku hingga"
            register={register}
            name="identitasBerlakuHingga"
            error={errors.identitasBerlakuHingga}
            className="md:w-1/3"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Pekerjaan"
            register={register}
            name="pekerjaan"
            error={errors.pekerjaan}
            className="md:w-full"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Alamat Kantor/Pekerjaan/Perguruan Tinggi"
            register={register}
            name="pekejerjaanAlamat"
            error={errors.pekejerjaanAlamat}
            className="md:w-3/4"
          />
          <InputForm
            label="Telp/hp"
            register={register}
            name="pekerjaanTelp"
            error={errors.pekerjaanTelp}
            className="md:w-1/4"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Alamat Tempat Tinggal di Indonesia"
            register={register}
            name="IndonesiaAlamat"
            error={errors.IndonesiaAlamat}
            className="md:w-3/4"
          />
          <InputForm
            label="Telp/hp"
            register={register}
            name="IndonesiaTelp"
            error={errors.IndonesiaTelp}
            className="md:w-1/4"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Alamat Tempat Tinggal di Luar Negeri"
            register={register}
            name="lnAlamat"
            error={errors.lnAlamat}
            className="md:w-3/4"
          />
          <InputForm
            label="Telp/hp"
            register={register}
            name="lnTelp"
            error={errors.lnTelp}
            className="md:w-1/4"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Email"
            register={register}
            name="alamatEmail"
            error={errors.alamatEmail}
            className="md:w-full"
          />
          <SelectForm
            label="Status Sipil"
            name="statusSipil"
            error={errors.statusSipil}
            register={register}
            className="md:w-1/2"
            //value={statusSipil}
            onChange={(e) => setStatusSipil(Number(e.target.value))}
          >
            <option value="0">Pilih Status Sipil</option>
            <option value="1">Kawin</option>
            <option value="2">Tidak Kawin</option>
            <option value="3">Cerai Mati</option>
            <option value="4">Cerai Hidup</option>
          </SelectForm>
        </FormRow>
        <Separator />
        <h1 className="text-md font-semibold">Identitas Orang Tua</h1>
        <FormRow>
          <InputForm
            label="Nama Ibu"
            register={register}
            name="ibuNama"
            error={errors.ibuNama}
            className="md:w-2/3"
          />
          <InputForm
            label="Kewarganegaraan Ibu"
            register={register}
            name="ibuKewarganegaraan"
            error={errors.ibuKewarganegaraan}
            className="md:w-1/3"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Tempat Lahir Ibu"
            register={register}
            name="ibuTempatLahir"
            error={errors.ibuTempatLahir}
            className="md:w-2/3"
          />
          <InputForm
            label="Tanggal Lahir Ibu"
            register={register}
            name="ibuTanggalLahir"
            error={errors.ibuTanggalLahir}
            className="md:w-1/3"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Nama Ayah"
            register={register}
            name="ayahNama"
            error={errors.ayahNama}
            className="md:w-2/3"
          />
          <InputForm
            label="Kewarganegaraan Ayah"
            register={register}
            name="ayahKewarganegaraan"
            error={errors.ayahKewarganegaraan}
            className="md:w-1/3"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Tempat Lahir Ayah"
            register={register}
            name="ayahTempatLahir"
            error={errors.ayahTempatLahir}
            className="md:w-2/3"
          />
          <InputForm
            label="Tanggal Lahir Ayah"
            register={register}
            name="ayahTanggalLahir"
            error={errors.ayahTanggalLahir}
            className="md:w-1/3"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Alamat Orang Tua"
            register={register}
            name="ortuAlamat"
            error={errors.ortuAlamat}
            className="md:w-3/4"
          />
          <InputForm
            label="Telp/hp"
            register={register}
            name="ortuTelp"
            error={errors.ortuTelp}
            className="md:w-1/4"
          />
        </FormRow>
        {statusSipil === 1 && (
          <>
            <Separator />
            <h1 className="text-md font-semibold">Identitas Suami/istri</h1>
            <FormRow>
              <InputForm
                label="Nama Suami/Istri"
                register={register}
                name="suamiIstriNama"
                error={errors.suamiIstriNama}
                className="md:w-2/3"
              />
              <InputForm
                label="Kewarganegaraan"
                register={register}
                name="suamiIstriKewarganegaraan"
                error={errors.suamiIstriKewarganegaraan}
                className="md:w-1/3"
              />
            </FormRow>
            <FormRow>
              <InputForm
                label="Tempat Lahir"
                register={register}
                name="suamiIstriTempatLahir"
                error={errors.suamiIstriTempatLahir}
                className="md:w-2/3"
              />
              <InputForm
                label="Tanggal Lahir"
                register={register}
                name="suamiIstriTanggalLahir"
                error={errors.suamiIstriTanggalLahir}
                className="md:w-1/3"
              />
            </FormRow>
            <FormRow>
              <InputForm
                label="Alamat"
                register={register}
                name="suamiIstriAlamat"
                error={errors.suamiIstriAlamat}
              />
            </FormRow>
          </>
        )}

        {jenisPermohonan && jenisPermohonan.charAt(0) === "C" && (
          <>
            <Separator />
            <h1 className="text-md font-semibold">
              Diisi untuk Permohonan Perubahan
            </h1>
            <FormRow>
              <InputForm
                label="Nama"
                register={register}
                name="perubahanNama"
                error={errors.perubahanNama}
              />
            </FormRow>
            <FormRow>
              <InputForm
                label="Alamat"
                register={register}
                name="perubahanAlamat"
                error={errors.perubahanAlamat}
                className="md:w-2/3"
              />
              <InputForm
                label="Telp/hp"
                register={register}
                name="perubahanTelp"
                error={errors.perubahanTelp}
                className="md:w-1/3"
              />
            </FormRow>
          </>
        )}

        <Separator />
        <h1 className="text-md font-semibold">
          Bila terjadi permasalahan, Harap Hubungi
        </h1>

        <h1 className="text-sm font-semibold">Kontak di Luar Negeri</h1>
        <FormRow>
          <InputForm
            label="Nama"
            register={register}
            name="darurat1Nama"
            error={errors.darurat1Nama}
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Alamat Tinggal di Luar Negeri"
            register={register}
            name="darurat1Alamat"
            error={errors.darurat1Alamat}
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Telp"
            register={register}
            name="darurat1Telp"
            error={errors.darurat1Telp}
            className="md:w-2/3"
          />
          <InputForm
            label="hp"
            register={register}
            name="darurat1Hp"
            error={errors.darurat1Hp}
            className="md:w-1/3"
          />
        </FormRow>
        <h1 className="text-sm font-semibold">Kontak di Indonesia</h1>
        <FormRow>
          <InputForm
            label="Nama"
            register={register}
            name="darurat2Nama"
            error={errors.darurat2Nama}
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Alamat Tinggal di Indonesia"
            register={register}
            name="darurat2Alamat"
            error={errors.darurat2Alamat}
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Telp"
            register={register}
            name="darurat2Telp"
            error={errors.darurat2Telp}
            className="md:w-2/3"
          />
          <InputForm
            label="hp"
            register={register}
            name="darurat2Hp"
            error={errors.darurat2Hp}
            className="md:w-1/3"
          />
        </FormRow>
        <Separator />
        <h1 className="text-sm font-semibold">Pernyataan keterangan</h1>

        <FormRow>
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Seluruh keterangan dan data yang saya nyatakan dalam formulir ini
            adalah sah dan sesuai dengan keadaan yang sebenarnya, dan apabila
            dikemudian hari ternyata pernyataan ini tidak benar, saya bersedia
            dituntut sesuai dengan ketentuan peraturan perundang-undangan yang
            berlaku.
          </label>
        </FormRow>
        <FormRow>
          <Button
            className=" w-full py-6"
            disabled={isSubmitting}
            type="button"
            onClick={() => {
              console.log("submitting");
              handleSubmit(onSubmit)();
              console.log(
                isDirty,
                isValid,
                isSubmitted,
                isSubmitSuccessful,
                isValid
              );
            }}
          >
            Simpan dan Lanjutkan
            {isSubmitting && (
              <Loader className="ml-2 spin-in" size={24} color="white" />
            )}
          </Button>
        </FormRow>
      </form>
    </div>
  );
};

export default SpriForm;
