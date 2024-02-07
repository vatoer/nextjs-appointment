import WnGandaForm from "./_components/form";

const WnGandaPage = async ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <WnGandaForm />
      </div>
    </main>
  );
};

export default WnGandaPage;
