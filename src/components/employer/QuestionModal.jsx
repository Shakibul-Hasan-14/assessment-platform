import { useState } from "react";
import OptionInput from "./OptionInput";

const QuestionModal = ({ editingQuestion, onSave, onSaveAndMore, onClose }) => {
  const [type, setType] = useState(editingQuestion?.type || "mcq");
  const [title, setTitle] = useState(editingQuestion?.title || "");
  const [options, setOptions] = useState(editingQuestion?.options || ["", ""]);
  const [correctAnswers, setCorrectAnswers] = useState(
    editingQuestion?.correctAnswers || [],
  );
  const [errors, setErrors] = useState({});

  const addOption = () => setOptions([...options, ""]);

  const removeOption = (i) => {
    setOptions(options.filter((_, idx) => idx !== i));
    setCorrectAnswers(
      correctAnswers.filter((c) => c !== i).map((c) => (c > i ? c - 1 : c)),
    );
  };

  const updateOption = (i, val) =>
    setOptions(options.map((o, idx) => (idx === i ? val : o)));

  const toggleCorrect = (i) => {
    if (type === "checkbox") {
      setCorrectAnswers((prev) =>
        prev.includes(i) ? prev.filter((c) => c !== i) : [...prev, i],
      );
    } else {
      setCorrectAnswers([i]);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Question is required";
    if (type !== "paragraph") {
      const filled = options.filter(Boolean);
      if (filled.length < 2)
        newErrors.options = "At least 2 options are required";
      if (correctAnswers.length === 0)
        newErrors.correct = "Please set at least one correct answer";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => ({
    title,
    type,
    options: type === "paragraph" ? [] : options.filter(Boolean),
    correctAnswers,
  });

  const handleSave = () => {
    if (!validate()) return;
    onSave(buildPayload());
  };

  const handleSaveAndMore = () => {
    if (!validate()) return;
    onSaveAndMore(buildPayload());
    setTitle("");
    setOptions(["", ""]);
    setCorrectAnswers([]);
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
      <div className="bg-white w-full max-w-225 max-h-[90vh] overflow-y-auto rounded-3xl p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-[18px] text-[#334155]">
            {editingQuestion ? "Edit Question" : "Add Question"}
          </h3>
          <div className="flex items-center gap-4">
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setCorrectAnswers([]);
              }}
              className="h-10 border border-[#E5E7EB] rounded-lg px-3 text-sm outline-none focus:border-[#6633FF]"
            >
              <option value="mcq">MCQ</option>
              <option value="checkbox">Checkbox</option>
              <option value="paragraph">Paragraph</option>
            </select>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 text-xl transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Question textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#475569]">
            Question <span className="text-red-500">*</span>
          </label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type your question here..."
            className={`w-full h-30 p-4 border rounded-xl outline-none resize-none transition-all text-sm
              ${errors.title ? "border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
          />
          {errors.title && (
            <span className="text-xs text-red-500">{errors.title}</span>
          )}
        </div>

        {/* Options */}
        {type !== "paragraph" && (
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-[#475569]">
              Options <span className="text-red-500">*</span>
            </label>

            {options.map((opt, i) => (
              <OptionInput
                key={i}
                index={i}
                value={opt}
                type={type}
                isCorrect={correctAnswers.includes(i)}
                onChange={updateOption}
                onToggleCorrect={toggleCorrect}
                onRemove={removeOption}
                canRemove={options.length > 2}
              />
            ))}

            {errors.options && (
              <span className="text-xs text-red-500">{errors.options}</span>
            )}
            {errors.correct && (
              <span className="text-xs text-red-500">{errors.correct}</span>
            )}

            <button
              type="button"
              onClick={addOption}
              className="text-[#6633FF] font-bold text-[14px] flex items-center gap-2 mt-2 w-fit"
            >
              + Add another option
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={handleSave}
            className="px-10 py-3 border border-[#6633FF] text-[#6633FF] rounded-xl font-bold hover:bg-[#6633FF]/5 transition-all"
          >
            Save
          </button>
          {!editingQuestion && (
            <button
              type="button"
              onClick={handleSaveAndMore}
              className="px-10 py-3 bg-[#6633FF] text-white rounded-xl font-bold hover:bg-[#5522EE] transition-all"
            >
              Save & Add More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
