const ServiceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full md:w-2/3 pb-20 px-2">{children}</div>
    </main>
  );
};

export default ServiceLayout;
