const FormTextarea = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[14px] font-medium text-[#334155]">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        {...props}
        className={`w-full p-3 rounded-lg border transition-all placeholder:text-[#94A3B8] text-sm focus:outline-none resize-none
          ${error ? "border-red-400 focus:border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}
          ${props.className || ""}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default FormTextarea;
