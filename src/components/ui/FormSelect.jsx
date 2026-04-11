const FormSelect = ({
  label,
  error,
  required,
  children,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 relative">
      {label && (
        <label className="text-[14px] font-medium text-[#475569]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        {...props}
        className={`w-full h-12 px-4 rounded-xl border outline-none bg-white appearance-none transition-all text-sm
          ${error ? "border-red-400 focus:border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}
          ${className || ""}`}
      >
        {children}
      </select>
      <img
        src="/icons/arrow-down.svg"
        alt="Dropdown"
        className="h-6 aspect-square absolute right-4 bottom-3 pointer-events-none"
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default FormSelect;
