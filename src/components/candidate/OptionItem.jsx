const OptionItem = ({ type, label, id, name, checked, onChange }) => (
  <label
    htmlFor={id}
    className={`flex items-center gap-4 p-5 border rounded-xl cursor-pointer transition-all group
      ${checked ? "border-[#6633FF] bg-[#6633FF]/5" : "border-[#E5E7EB] hover:border-[#6633FF]"}`}
  >
    <input
      type={type}
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 accent-[#6633FF]"
    />
    <span
      className={`text-[16px] ${checked ? "text-[#334155] font-medium" : "text-[#475569] group-hover:text-[#334155]"}`}
    >
      {label}
    </span>
  </label>
);

export default OptionItem;
