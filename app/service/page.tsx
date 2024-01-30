import Card from "./_components/card";
import CardContent from "./_components/card-content";
import CardWnGanda from "./_components/card-wn-ganda";
import SyaratUmum from "./_components/syarat-umum";

const ServicePage = () => {
  return (
    <div className="w-full items-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900">Pelayanan Paspor</h1>
        <h1 className="text-xl font-bold text-gray-900 m-5">
          Persyaratan Umum
        </h1>
        <SyaratUmum />
        <h1 className="text-xl font-bold text-gray-900 m-10">
          Pilih layanan yang anda butuhkan
        </h1>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-8">
        <CardWnGanda />
        <CardWnGanda />
      </div>
    </div>
  );
};
export default ServicePage;
