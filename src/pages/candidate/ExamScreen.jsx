import React, { useState } from "react";

const ExamScreen = () => {
  const [testStatus, setTestStatus] = useState("active"); // 'active', 'completed', 'timeout'
  const [activeQuestion, setActiveQuestion] = useState(1);

  if (testStatus === "completed") return <TestCompletedScreen />;
  if (testStatus === "timeout") return <TimeoutModal />;

  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-screen flex flex-col">
      {/* Exam Header */}
      <div className="bg-white px-[80px] py-[20px] flex justify-center items-center relative border-b border-[#E5E7EB]">
        <h1 className="text-[20px] font-bold text-[#334155]">Akij Resource</h1>
      </div>

      <div className="flex-1 px-[80px] py-[40px] flex flex-col items-center gap-[24px]">
        {/* Question Counter & Timer */}
        <div className="w-full max-w-[800px] bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] flex justify-between items-center">
          <span className="text-[18px] font-semibold text-[#334155]">
            Question ({activeQuestion}/20)
          </span>
          <div className="bg-[#F1F5F9] px-[24px] py-[12px] rounded-[12px] flex items-center gap-2">
            <span className="font-bold text-[#334155] text-[18px]">
              20:31 left
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="w-full max-w-[800px] bg-white border border-[#E5E7EB] rounded-[24px] p-[40px] flex flex-col gap-[32px]">
          <h2 className="text-[20px] font-semibold text-[#334155]">
            Q{activeQuestion}. Which of the following indicators is used to
            measure market volatility?
          </h2>

          {/* Option Types: Toggle these based on your logic */}
          <div className="flex flex-col gap-[16px]">
            <OptionItem
              type="radio"
              label="Relative Strength Index (RSI)"
              id="opt1"
              name="exam"
            />
            <OptionItem
              type="radio"
              label="Moving Average Convergence Divergence (MACD)"
              id="opt2"
              name="exam"
            />
            <OptionItem
              type="radio"
              label="Bollinger Bands"
              id="opt3"
              name="exam"
            />
            <OptionItem
              type="radio"
              label="Fibonacci Retracement"
              id="opt4"
              name="exam"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button className="px-[24px] py-[14px] border border-[#E5E7EB] rounded-[12px] text-[#475569] font-semibold hover:bg-gray-50">
              Skip this Question
            </button>
            <button
              onClick={() => setTestStatus("completed")}
              className="px-[40px] py-[14px] bg-[#6633FF] text-white rounded-[12px] font-bold hover:bg-[#5522EE] transition-all shadow-lg shadow-[#6633FF]/20"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Components for different states */

const OptionItem = ({ type, label, id, name }) => (
  <label
    htmlFor={id}
    className="flex items-center gap-[16px] p-[20px] border border-[#E5E7EB] rounded-[12px] cursor-pointer hover:border-[#6633FF] transition-all group"
  >
    <input
      type={type}
      id={id}
      name={name}
      className="w-[20px] h-[20px] accent-[#6633FF] border-gray-300"
    />
    <span className="text-[16px] text-[#475569] group-hover:text-[#334155]">
      {label}
    </span>
  </label>
);

const TestCompletedScreen = () => (
  <div className="flex-1 bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
    <div className="bg-white p-[60px] rounded-[32px] border border-[#E5E7EB] shadow-sm max-w-[900px] flex flex-col items-center gap-6">
      <div className="w-[64px] h-[64px] bg-[#3B82F6] text-white rounded-full flex items-center justify-center text-[32px]">
        ✓
      </div>
      <h2 className="text-[28px] font-bold text-[#334155]">Test Completed</h2>
      <p className="text-[#64748B] text-[18px] max-w-[600px] leading-relaxed">
        Congratulations! Md. Naimur Rahman, You have completed your MCQ Exam for
        Probationary Officer. Thank you for participating.
      </p>
      <button className="mt-4 px-[32px] py-[14px] border border-[#E5E7EB] rounded-[12px] font-semibold text-[#475569] hover:bg-gray-50">
        Back to Dashboard
      </button>
    </div>
  </div>
);

const TimeoutModal = () => (
  <div className="fixed inset-0 bg-[#334155]/60 flex items-center justify-center z-50">
    <div className="bg-white p-[48px] rounded-[24px] max-w-[500px] w-full text-center flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-full border-4 border-red-100 flex items-center justify-center text-red-500 text-2xl">
        🕒
      </div>
      <h2 className="text-[24px] font-bold text-[#334155]">Timeout!</h2>
      <p className="text-[#64748B]">
        Dear Md. Naimur Rahman, Your exam time has been finished. Thank you for
        participating.
      </p>
      <button className="w-full py-3 border border-[#E5E7EB] rounded-xl font-semibold mt-4">
        Back to Dashboard
      </button>
    </div>
  </div>
);

export default ExamScreen;
