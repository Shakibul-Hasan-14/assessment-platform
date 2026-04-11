import { useNavigate } from "react-router-dom";
import useQuestionBuilder from "../../../hooks/useQuestionBuilder";
import QuestionItem from "../../../components/employer/QuestionItem";
import QuestionModal from "../../../components/employer/QuestionModal";

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
    <div className="flex-1 bg-[#F8FAFC] px-20 py-8 flex flex-col gap-6">
      {/* Header Card */}
      <div className="max-w-7xl w-full mx-auto bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-semibold text-[#334155]">
            Manage Online Test
          </h2>
          <button
            onClick={() => navigate("/employer/dashboard")}
            className="cursor-pointer px-5 py-2.5 border border-[#E5E7EB] rounded-xl text-[#475569] font-medium hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-10">
          <button
            type="button"
            onClick={() =>
              navigate("/employer/manage-test/basic-info?mode=view")
            }
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-[#6633FF] text-white rounded-full flex items-center justify-center font-bold text-[14px]">
              ✓
            </div>
            <span className="text-[#6633FF] font-semibold text-[14px]">
              Basic Info
            </span>
          </button>
          <div className="h-px w-16 bg-[#6633FF]" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#6633FF] text-white rounded-full flex items-center justify-center font-bold text-[14px]">
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
      {!loadingQuestions && questions.length > 0 && (
        <div className="flex flex-col gap-5">
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
        className="cursor-pointer max-w-5xl w-full mx-auto py-4 bg-[#6633FF] text-white rounded-2xl font-bold text-[18px] shadow-lg hover:bg-[#5522EE] transition-all"
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

export default QuestionBuilder;
