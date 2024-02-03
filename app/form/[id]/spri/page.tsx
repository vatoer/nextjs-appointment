import SpriForm from "./_components/form";

const SpriPage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="p-2 w-11/12 md:w-4/6">
        <SpriForm />
      </div>
      <div>bawah</div>
    </div>
  );
};

export default SpriPage;
