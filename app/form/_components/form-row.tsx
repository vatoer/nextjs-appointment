const FormRow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col md:flex-row md:gap-12">{children}</div>
);

export default FormRow;
