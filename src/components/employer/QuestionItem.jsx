const QuestionItem = ({ number, question, onEdit, onDelete }) => (
  <div className="max-w-5xl mx-auto w-full bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col gap-5">
    {/* Header */}
    <div className="flex justify-between items-center">
      <span className="font-semibold text-[#334155]">Question {number}</span>
      <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded text-[12px] text-gray-500 font-medium uppercase">
        {question.type}
      </span>
    </div>

    {/* Question title */}
    <p className="font-bold text-[#334155] text-[16px]">{question.title}</p>

    {/* Options */}
    {question.options && question.options.length > 0 && (
      <div className="flex flex-col gap-3">
        {question.options.map((opt, i) => {
          const isCorrect = question.correctAnswers?.includes(i);
          return (
            <div
              key={i}
              className={`p-4 rounded-xl flex justify-between items-center w-2/3
                ${isCorrect ? "bg-[#F3F4F6]" : "bg-[#F8FAFC]"}`}
            >
              <span
                className={
                  isCorrect ? "text-[#334155] font-medium" : "text-[#64748B]"
                }
              >
                {String.fromCharCode(65 + i)}. {opt}
              </span>
              {isCorrect && (
                <span className="text-[#6633FF] text-sm font-semibold">
                  <img
                    src="/icons/correct.svg"
                    alt="Correct"
                    className="h-6 aspect-square"
                  />
                </span>
              )}
            </div>
          );
        })}
      </div>
    )}

    {/* Actions */}
    <div className="flex justify-between items-center pt-4 border-t border-[#F1F5F9]">
      <button
        onClick={onEdit}
        className="text-[#6633FF] font-semibold text-[14px] hover:underline"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="text-[#F43F5E] font-semibold text-[14px] hover:underline"
      >
        Remove From Exam
      </button>
    </div>
  </div>
);

export default QuestionItem;
