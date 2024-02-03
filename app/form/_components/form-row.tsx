const FormRow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col md:flex-row md:gap-2">{children}</div>
);

export default FormRow;
