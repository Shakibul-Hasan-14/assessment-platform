import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useQuestionBuilder from "../../../hooks/useQuestionBuilder";

const QuestionBuilder = () => {
  const navigate = useNavigate();
  const {
    questions,
    loadingQuestions,
    showModal,
    editingQuestion,
    openAddModal,
    openEditModal,
    handleAddQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    setShowModal,
  } = useQuestionBuilder();

  return (
    <div className="flex-1 bg-[#F8FAFC] px-[80px] py-[32px] flex flex-col gap-[24px]">
      {/* Header Card */}
      <div className="w-full bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-semibold text-[#334155]">
            Manage Online Test
          </h2>
          <button
            onClick={() => navigate("/employer/dashboard")}
            className="px-[20px] py-[10px] border border-[#E5E7EB] rounded-[12px] text-[#475569] font-medium hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-[40px]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[32px] h-[32px] bg-[#6633FF] text-white rounded-full flex items-center justify-center font-bold text-[14px]">
              ✓
            </div>
            <span className="text-[#6633FF] font-semibold text-[14px]">
              Basic Info
            </span>
          </div>
          <div className="h-[1px] w-[64px] bg-[#6633FF]" />
          <div className="flex items-center gap-[12px]">
            <div className="w-[32px] h-[32px] bg-[#6633FF] text-white rounded-full flex items-center justify-center font-bold text-[14px]">
              2
            </div>
            <span className="text-[#6633FF] font-semibold text-[14px]">
              Question Sets
            </span>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loadingQuestions && (
        <div className="flex items-center justify-center py-10 text-[#94A3B8] text-sm">
          Loading questions...
        </div>
      )}

      {/* Questions List */}
      {!loadingQuestions && (
        <div className="flex flex-col gap-[20px]">
          {questions.length === 0 && (
            <div className="flex items-center justify-center py-10 text-[#94A3B8] text-sm">
              No questions yet. Add your first question below.
            </div>
          )}
          {questions.map((q, index) => (
            <QuestionItem
              key={q.id}
              number={index + 1}
              question={q}
              onEdit={() => openEditModal(q)}
              onDelete={() => handleDeleteQuestion(q.id)}
            />
          ))}
        </div>
      )}

      {/* Add Question Button */}
      <button
        onClick={openAddModal}
        className="w-full py-[16px] bg-[#6633FF] text-white rounded-[16px] font-bold text-[18px] shadow-lg hover:bg-[#5522EE] transition-all"
      >
        Add Question
      </button>

      {/* Modal */}
      {showModal && (
        <QuestionModal
          editingQuestion={editingQuestion}
          onSave={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
          onSaveAndMore={handleAddQuestion}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const QuestionItem = ({ number, question, onEdit, onDelete }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[32px] flex flex-col gap-[20px]">
    <div className="flex justify-between items-center">
      <span className="font-semibold text-[#334155]">Question {number}</span>
      <div className="flex gap-2">
        <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded text-[12px] text-gray-500 font-medium uppercase">
          {question.type}
        </span>
      </div>
    </div>

    <p className="font-bold text-[#334155] text-[16px]">{question.title}</p>

    {question.options && question.options.length > 0 && (
      <div className="flex flex-col gap-[12px]">
        {question.options.map((opt, i) => (
          <div
            key={i}
            className="p-[16px] rounded-[12px] border border-[#F1F5F9] bg-[#F8FAFC] flex justify-between items-center"
          >
            <span className="text-[#64748B]">
              {String.fromCharCode(65 + i)}. {opt}
            </span>
          </div>
        ))}
      </div>
    )}

    <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#F1F5F9]">
      <button
        onClick={onEdit}
        className="text-[#6633FF] font-semibold text-[14px]"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="text-[#F43F5E] font-semibold text-[14px]"
      >
        Remove From Exam
      </button>
    </div>
  </div>
);

const QuestionModal = ({ editingQuestion, onSave, onSaveAndMore, onClose }) => {
  const [type, setType] = useState(editingQuestion?.type || "mcq");
  const [title, setTitle] = useState(editingQuestion?.title || "");
  const [options, setOptions] = useState(editingQuestion?.options || ["", ""]);

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (i) => setOptions(options.filter((_, idx) => idx !== i));
  const updateOption = (i, val) =>
    setOptions(options.map((o, idx) => (idx === i ? val : o)));

  const buildPayload = () => ({
    title,
    type,
    options: type === "paragraph" ? [] : options.filter(Boolean),
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-[900px] max-h-[90vh] overflow-y-auto rounded-[24px] p-[32px] flex flex-col gap-[24px]">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-[18px] text-[#334155]">
            {editingQuestion ? "Edit Question" : "Add Question"}
          </h3>
          <div className="flex items-center gap-4">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-[40px] border border-[#E5E7EB] rounded-lg px-3 text-sm outline-none"
            >
              <option value="mcq">MCQ</option>
              <option value="checkbox">Checkbox</option>
              <option value="paragraph">Paragraph</option>
            </select>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Question Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#475569]">Question</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type your question here..."
            className="w-full h-[120px] p-4 border border-[#E5E7EB] rounded-xl outline-none resize-none focus:border-[#6633FF] transition-all"
          />
        </div>

        {/* Options — only for mcq and checkbox */}
        {type !== "paragraph" && (
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-[#475569]">
              Options
            </label>
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center text-xs text-gray-400 shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  className="flex-1 h-[48px] px-4 border border-[#E5E7EB] rounded-xl outline-none focus:border-[#6633FF] transition-all"
                />
                {options.length > 2 && (
                  <button
                    onClick={() => removeOption(i)}
                    className="text-gray-300 hover:text-red-400 text-lg"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addOption}
              className="text-[#6633FF] font-bold text-[14px] flex items-center gap-2 mt-2"
            >
              + Add another option
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => onSave(buildPayload())}
            className="px-10 py-3 border border-[#6633FF] text-[#6633FF] rounded-xl font-bold hover:bg-[#6633FF]/5 transition-all"
          >
            Save
          </button>
          {!editingQuestion && (
            <button
              onClick={() => {
                onSaveAndMore(buildPayload());
                setTitle("");
                setOptions(["", ""]);
              }}
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

export default QuestionBuilder;
