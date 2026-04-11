import useExam from "../../hooks/useExam";

const ExamScreen = () => {
  const {
    activeTest,
    user,
    activeQuestion,
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
      {/* Exam Header */}
      <div className="bg-white px-20 py-5 flex justify-center items-center border-b border-[#E5E7EB]">
        <h1 className="text-[20px] font-bold text-[#334155]">Akij Resource</h1>
      </div>

      {/* Behavioral warnings banner */}
      {warnings.length > 0 && (
        <div className="bg-red-50 border-b border-red-200 px-20 py-2 text-red-600 text-sm">
          ⚠️ Warning: Suspicious activity detected ({warnings.length} time
          {warnings.length > 1 ? "s" : ""})
        </div>
      )}

      <div className="flex-1 px-20 py-10 flex flex-col items-center gap-6">
        {/* Question Counter & Timer */}
        <div className="w-full max-w-200 bg-white border border-[#E5E7EB] rounded-2xl p-6 flex justify-between items-center">
          <span className="text-[18px] font-semibold text-[#334155]">
            Question ({activeQuestion + 1}/{totalQuestions})
          </span>
          <div
            className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all
            ${isWarning ? "bg-red-50 border border-red-200" : "bg-[#F1F5F9]"}`}
          >
            <span
              className={`font-bold text-[18px] ${isWarning ? "text-red-500" : "text-[#334155]"}`}
            >
              {formatTime(timeLeft)} left
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="w-full max-w-200 bg-white border border-[#E5E7EB] rounded-3xl p-10 flex flex-col gap-8">
          <h2 className="text-[20px] font-semibold text-[#334155]">
            Q{activeQuestion + 1}. {question.title}
          </h2>

          {/* Options */}
          {question.type !== "paragraph" && (
            <div className="flex flex-col gap-4">
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

          {/* Paragraph type */}
          {question.type === "paragraph" && (
            <textarea
              value={answers[question.id] || ""}
              onChange={(e) =>
                handleAnswer(question.id, e.target.value, "paragraph")
              }
              placeholder="Type your answer here..."
              className="w-full h-40 p-4 border border-[#E5E7EB] rounded-xl outline-none focus:border-[#6633FF] resize-none transition-all"
            />
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleSkip}
              disabled={isLastQuestion}
              className="px-6 py-3.5 border border-[#E5E7EB] rounded-xl text-[#475569] font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Skip this Question
            </button>
            <button
              onClick={handleNext}
              className="px-10 py-3.5 bg-[#6633FF] text-white rounded-xl font-bold hover:bg-[#5522EE] transition-all shadow-lg shadow-[#6633FF]/20"
            >
              {isLastQuestion ? "Submit Exam" : "Save & Continue"}
            </button>
          </div>
        </div>

        {/* Question Navigation Pills */}
        <div className="w-full max-w-200 bg-white border border-[#E5E7EB] rounded-2xl p-6">
          <p className="text-sm text-[#94A3B8] mb-3">Question Navigator</p>
          <div className="flex flex-wrap gap-2">
            {activeTest.questions.map((q, i) => (
              <button
                key={i}
                onClick={() => {}}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all
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

const TestCompletedScreen = ({ user, test, onBack }) => (
  <div className="flex-1 bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center min-h-screen">
    <div className="bg-white p-15 rounded-4xl border border-[#E5E7EB] shadow-sm max-w-225 w-full flex flex-col items-center gap-6">
      <div className="w-16 h-16 bg-[#3B82F6] text-white rounded-full flex items-center justify-center text-[32px]">
        ✓
      </div>
      <h2 className="text-[28px] font-bold text-[#334155]">Test Completed</h2>
      <p className="text-[#64748B] text-[18px] max-w-150 leading-relaxed">
        Congratulations! {user?.name}, you have completed your exam for{" "}
        <span className="font-semibold text-[#334155]">{test?.title}</span>.
        Thank you for participating.
      </p>
      <button
        onClick={onBack}
        className="mt-4 px-8 py-3.5 border border-[#E5E7EB] rounded-xl font-semibold text-[#475569] hover:bg-gray-50"
      >
        Back to Dashboard
      </button>
    </div>
  </div>
);

const TimeoutModal = ({ user, onBack }) => (
  <div className="fixed inset-0 bg-[#334155]/60 flex items-center justify-center z-50">
    <div className="bg-white p-12 rounded-3xl max-w-125 w-full text-center flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-full border-4 border-red-100 flex items-center justify-center text-red-500 text-2xl">
        🕒
      </div>
      <h2 className="text-[24px] font-bold text-[#334155]">Timeout!</h2>
      <p className="text-[#64748B]">
        Dear {user?.name}, your exam time has finished. Thank you for
        participating.
      </p>
      <button
        onClick={onBack}
        className="w-full py-3 border border-[#E5E7EB] rounded-xl font-semibold mt-4 hover:bg-gray-50"
      >
        Back to Dashboard
      </button>
    </div>
  </div>
);

export default ExamScreen;
