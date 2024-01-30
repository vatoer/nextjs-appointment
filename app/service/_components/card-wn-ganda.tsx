"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Card from "./card";
import CardButton from "./card-button";
import CardContent from "./card-content";

export const CardWnGanda = () => {
  return (
    <Card title="Paspor untuk Anak WN Ganda">
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Documen yang harus diserahkan</AccordionTrigger>
            <AccordionContent>
              <div className="w-full px-4">
                <ul className="list-disc">
                  <li>
                    Formulir Permohonan Paspor RI yang sudah diisi lengkap.
                    Formulaire de demande de passeport dument rempli.
                  </li>
                  <li>
                    Surat Pernyataan Tidak Berkewarganegaraan Asing yang sudah
                    diisi lengkap. Lettre de déclaration de statut de
                    nationalité unique dument remplie.
                  </li>
                  <li>Paspor RI lama. Ancien passeport.</li>
                  <li>
                    Fotokopi Akta Kelahiran/Akta Kenal Lahir. Photocopie de
                    l&apos;acte de naissance.
                  </li>
                  <li>
                    Fotokopi bolak-balik kartu izin tinggal. Photocopie
                    recto-verso du titre de séjour/carte de résident.
                  </li>
                  <li>
                    Fotokopi akta perkawinan/livret de famille atau akta
                    perceraian (untuk yang menikah/cerai). Photocopie de
                    l&apos;acte de mariage/livret de famille ou l&apos;acte de
                    divorce.
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <CardButton title="Apply" onClick={() => {}} />
      </CardContent>
    </Card>
  );
};

export default CardWnGanda;
