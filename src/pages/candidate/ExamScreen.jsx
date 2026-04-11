import useExam from "../../hooks/useExam";
import OptionItem from "../../components/candidate/OptionItem";
import TestCompletedScreen from "../../components/candidate/TestCompletedScreen";
import TimeoutModal from "../../components/candidate/TimeoutModal";

const ExamScreen = () => {
  const {
    activeTest,
    user,
    activeQuestion,
    setActiveQuestion,
    answers,
    handleAnswer,
    timeLeft,
    formatTime,
    testStatus,
    warnings,
    handleSkip,
    handleNext,
    handleBackToDashboard,
    isLastQuestion,
  } = useExam();

  if (!activeTest) return null;
  if (testStatus === "completed")
    return (
      <TestCompletedScreen
        user={user}
        test={activeTest}
        onBack={handleBackToDashboard}
      />
    );
  if (testStatus === "timeout")
    return <TimeoutModal user={user} onBack={handleBackToDashboard} />;

  const question = activeTest.questions[activeQuestion];
  const totalQuestions = activeTest.questions.length;
  const isWarning = timeLeft < 60;

  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-screen flex flex-col">
      {/* Behavioral warnings banner */}
      {warnings.length > 0 && (
        <div className="bg-red-50 border-b border-red-200 px-4 md:px-20 py-2 text-red-600 text-sm">
          ⚠️ Warning: Suspicious activity detected ({warnings.length} time
          {warnings.length > 1 ? "s" : ""})
        </div>
      )}

      <div className="flex-1 px-4 md:px-8 lg:px-20 py-6 md:py-10 flex flex-col items-center gap-4 md:gap-6">
        {/* Question Counter & Timer */}
        <div className="w-full max-w-4xl bg-white border border-[#E5E7EB] rounded-2xl p-4 md:p-6 flex justify-between items-center">
          <span className="text-base md:text-[18px] font-semibold text-[#334155]">
            Question ({activeQuestion + 1}/{totalQuestions})
          </span>
          <div
            className={`px-4 md:px-6 py-2 md:py-3 rounded-xl flex items-center gap-2 transition-all
            ${isWarning ? "bg-red-50 border border-red-200" : "bg-[#F1F5F9]"}`}
          >
            <span
              className={`font-bold text-base md:text-[18px] ${isWarning ? "text-red-500" : "text-[#334155]"}`}
            >
              {formatTime(timeLeft)} left
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="w-full max-w-4xl bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-10 flex flex-col gap-6 md:gap-8">
          <h2 className="text-base md:text-[20px] font-semibold text-[#334155]">
            Q{activeQuestion + 1}. {question.title}
          </h2>

          {/* MCQ / Checkbox */}
          {question.type !== "paragraph" && (
            <div className="flex flex-col gap-3 md:gap-4">
              {question.options.map((opt, i) => {
                const isChecked =
                  question.type === "checkbox"
                    ? (answers[question.id] || []).includes(opt)
                    : answers[question.id] === opt;
                return (
                  <OptionItem
                    key={i}
                    type={question.type === "checkbox" ? "checkbox" : "radio"}
                    label={opt}
                    id={`opt-${i}`}
                    name={`question-${question.id}`}
                    checked={isChecked}
                    onChange={() =>
                      handleAnswer(question.id, opt, question.type)
                    }
                  />
                );
              })}
            </div>
          )}

          {/* Paragraph */}
          {question.type === "paragraph" && (
            <textarea
              value={answers[question.id] || ""}
              onChange={(e) =>
                handleAnswer(question.id, e.target.value, "paragraph")
              }
              placeholder="Type your answer here..."
              className="w-full h-36 md:h-40 p-4 border border-[#E5E7EB] rounded-xl outline-none focus:border-[#6633FF] resize-none transition-all text-sm md:text-base"
            />
          )}

          {/* Actions */}
          <div className="flex justify-between items-center mt-2 md:mt-4 gap-3">
            <button
              onClick={handleSkip}
              disabled={isLastQuestion}
              className="cursor-pointer px-4 md:px-6 py-3 md:py-3.5 border border-[#E5E7EB] rounded-xl text-[#475569] text-sm md:text-base font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Skip this Question
            </button>
            <button
              onClick={handleNext}
              className="cursor-pointer px-6 md:px-10 py-3 md:py-3.5 bg-[#6633FF] text-white rounded-xl text-sm md:text-base font-bold hover:bg-[#5522EE] transition-all shadow-lg shadow-[#6633FF]/20"
            >
              {isLastQuestion ? "Submit Exam" : "Save & Continue"}
            </button>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="w-full max-w-4xl bg-white border border-[#E5E7EB] rounded-2xl p-4 md:p-6">
          <p className="text-sm text-[#94A3B8] mb-3">Question Navigator</p>
          <div className="flex flex-wrap gap-2">
            {activeTest.questions.map((q, i) => (
              <button
                key={i}
                onClick={() => setActiveQuestion(i)}
                className={`w-8 h-8 md:w-9 md:h-9 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer
                  ${
                    i === activeQuestion
                      ? "bg-[#6633FF] text-white"
                      : answers[q.id]
                        ? "bg-[#6633FF]/10 text-[#6633FF] border border-[#6633FF]/20"
                        : "bg-[#F1F5F9] text-[#64748B]"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamScreen;
