import React, { useState } from "react";

const QuestionBuilder = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex-1 bg-[#F8FAFC] px-[80px] py-[32px] flex flex-col gap-[24px]">
      {/* Stepper Header (Same as before but Step 2 is Active) */}
      <div className="w-full bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-semibold text-[#334155]">Manage Online Test</h2>
          <button className="px-[20px] py-[10px] border border-[#E5E7EB] rounded-[12px] text-[#475569] font-medium">Back to Dashboard</button>
        </div>
        <div className="flex items-center gap-[40px]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[32px] h-[32px] bg-[#6633FF] text-white rounded-full flex items-center justify-center font-bold text-[14px]">✓</div>
            <span className="text-[#6633FF] font-semibold text-[14px]">Basic Info</span>
          </div>
          <div className="h-[1px] w-[64px] bg-[#6633FF]" />
          <div className="flex items-center gap-[12px]">
            <div className="w-[32px] h-[32px] bg-[#6633FF] text-white rounded-full flex items-center justify-center font-bold text-[14px]">2</div>
            <span className="text-[#6633FF] font-semibold text-[14px]">Questions Sets</span>
          </div>
        </div>
      </div>

      {/* List of Questions */}
      <div className="flex flex-col gap-[20px]">
        <QuestionItem 
          number="1" 
          type="MCQ" 
          points="1" 
          question="What is the Capital of Bangladesh?" 
          options={["Dhaka", "Chattogram", "Rajshahi", "Barishal"]} 
          correctIndex={0}
        />
        <QuestionItem 
          number="2" 
          type="Checkbox" 
          points="1" 
          question="What is the Capital of Bangladesh?" 
          options={["Dhaka", "Chattogram", "Rajshahi", "Barishal"]} 
          correctIndex={[0, 2]} 
        />
      </div>

      {/* Add Question Button */}
      <button 
        onClick={() => setShowModal(true)}
        className="w-full py-[16px] bg-[#6633FF] text-white rounded-[16px] font-bold text-[18px] shadow-lg hover:bg-[#5522EE] transition-all"
      >
        Add Question
      </button>

      {/* Modal Overlay */}
      {showModal && <QuestionModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const QuestionItem = ({ number, type, points, question, options, correctIndex }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[32px] flex flex-col gap-[20px] relative">
    <div className="flex justify-between items-center">
      <span className="font-semibold text-[#334155]">Question {number}</span>
      <div className="flex gap-2">
        <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded text-[12px] text-gray-500 font-medium uppercase">{type}</span>
        <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded text-[12px] text-gray-500 font-medium lowercase">{points} pt</span>
      </div>
    </div>
    
    <p className="font-bold text-[#334155] text-[16px]">{question}</p>
    
    <div className="flex flex-col gap-[12px]">
      {options.map((opt, i) => {
        const isCorrect = Array.isArray(correctIndex) ? correctIndex.includes(i) : correctIndex === i;
        return (
          <div key={i} className={`p-[16px] rounded-[12px] border ${isCorrect ? 'border-[#FFB800] bg-white' : 'border-[#F1F5F9] bg-[#F8FAFC]'} flex justify-between items-center`}>
            <span className={isCorrect ? 'text-[#334155] font-medium' : 'text-[#64748B]'}>{String.fromCharCode(65 + i)}. {opt}</span>
            {isCorrect && <span className="text-green-500 text-xl font-bold">✓</span>}
          </div>
        );
      })}
    </div>

    <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#F1F5F9]">
      <button className="text-[#6633FF] font-semibold text-[14px]">Edit</button>
      <button className="text-[#F43F5E] font-semibold text-[14px]">Remove From Exam</button>
    </div>
  </div>
);

const QuestionModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
    <div className="bg-white w-full max-w-[900px] max-h-[90vh] overflow-y-auto rounded-[24px] p-[32px] flex flex-col gap-[24px] relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full border flex items-center justify-center text-[14px] text-gray-400 font-medium">1</div>
          <h3 className="font-semibold text-[18px]">Question 1</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Score:</span>
            <input type="number" defaultValue="1" className="w-[60px] h-[40px] border border-[#E5E7EB] rounded-lg text-center" />
          </div>
          <select className="h-[40px] border border-[#E5E7EB] rounded-lg px-2 text-sm outline-none">
            <option>MCQ</option>
            <option>Checkbox</option>
            <option>Text</option>
          </select>
          <button className="text-gray-400 hover:text-red-500">🗑</button>
        </div>
      </div>

      {/* Editor Mockup */}
      <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
        <div className="bg-[#F8FAFC] px-4 py-2 border-b flex gap-4 text-gray-400 border-[#E5E7EB]">
           <span>↩ ↪</span> <span className="text-gray-600">Normal text ▾</span> <span>≡ ▾</span> <b>B</b> <i>I</i>
        </div>
        <textarea className="w-full h-[120px] p-4 outline-none resize-none" placeholder="Type your question here..."></textarea>
      </div>

      {/* Options Builder (Radio/Checkbox Mock) */}
      <div className="flex flex-col gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
               <span className="w-8 h-8 rounded-full border flex items-center justify-center text-xs text-gray-400">{String.fromCharCode(65+i)}</span>
               <label className="flex items-center gap-2 text-sm text-gray-500">
                  <input type="radio" name="correct" className="accent-[#6633FF]" /> Set as correct answer
               </label>
               <button className="ml-auto text-gray-300">🗑</button>
            </div>
            <div className="border border-[#E5E7EB] rounded-xl h-[80px] bg-[#F8FAFC]/50"></div>
          </div>
        ))}
        <button className="text-[#6633FF] font-bold text-[14px] flex items-center gap-2 mt-2">
          + Another options
        </button>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button onClick={onClose} className="px-10 py-3 border border-[#6633FF] text-[#6633FF] rounded-xl font-bold">Save</button>
        <button onClick={onClose} className="px-10 py-3 bg-[#6633FF] text-white rounded-xl font-bold">Save & Add More</button>
      </div>
    </div>
  </div>
);

export default QuestionBuilder;