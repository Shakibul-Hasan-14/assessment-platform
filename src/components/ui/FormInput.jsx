const FormInput = ({ label, error, required, className, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[14px] font-medium text-[#475569]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        {...props}
        className={`w-full h-12 px-4 rounded-xl border outline-none transition-all placeholder:text-[#94A3B8] text-sm
          ${error ? "border-red-400 focus:border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}
          ${props.disabled ? "bg-gray-50 text-[#94A3B8] cursor-not-allowed" : "bg-white"}
          ${className || ""}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;
