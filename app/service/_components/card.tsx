const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-xl overflow-hidden w-full">
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default Card;
