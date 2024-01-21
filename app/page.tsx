import BoxLabel from "@/components/box-label";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p className="text-4xl font-bold text-center">
          Welcome to{" "}
          <a
            href="https://nextjs.org"
            className="text-blue-600 hover:text-blue-700"
          >
            Next.js!
          </a>
        </p>
        <div>
          <BoxLabel label="Hello World 2024 ini sangat panjang sekali" maxCharPerRow={24} row={2} />
        </div>
      </div>
    </main>
  );
}
