const OptionInput = ({
  index,
  value,
  isCorrect,
  type,
  onChange,
  onToggleCorrect,
  onRemove,
  canRemove,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Correct answer toggle */}
      <label className="flex items-center gap-2 ml-11 cursor-pointer">
        <input
          type={type === "checkbox" ? "checkbox" : "radio"}
          name="correct-answer"
          checked={isCorrect}
          onChange={() => onToggleCorrect(index)}
          className="w-4 h-4 accent-[#6633FF]"
        />
        <span className="text-xs text-[#64748B]">Set as correct answer</span>
      </label>

      <div className="flex items-center gap-3">
        {/* Option Letter */}
        <span className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center text-xs text-gray-400 shrink-0">
          {String.fromCharCode(65 + index)}
        </span>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder={`Option ${String.fromCharCode(65 + index)}`}
          className="flex-1 h-12 px-4 border border-[#E5E7EB] rounded-xl outline-none focus:border-[#6633FF] transition-all text-sm"
        />

        {/* Remove */}
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-gray-300 hover:text-red-400 text-lg transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default OptionInput;
