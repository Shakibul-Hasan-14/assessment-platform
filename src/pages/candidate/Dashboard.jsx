import React from "react";

const CandidateDashboard = () => {
  return (
    <div className="flex-1 bg-[#F8FAFC] px-20 py-10 flex flex-col gap-8">
      {/* Search Header Area */}
      <div className="flex items-center justify-between">
        <h2 className="font-['Inter'] font-semibold text-[24px] leading-[130%] text-[#334155]">
          Online Tests
        </h2>

        {/* Search Bar matching the Employer Dashboard */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by exam title"
            className="w-[430px] h-[48px] pl-[16px] pr-[44px] rounded-[12px] border border-[#E5E7EB] bg-white focus:outline-none focus:border-[#6633FF] text-[14px] placeholder:text-[#94A3B8]"
          />
          <div className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#6633FF]">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid of Candidate Test Cards */}
      <div className="grid grid-cols-2 gap-[24px]">
        {[1, 2, 3, 4].map((i) => (
          <CandidateTestCard
            key={i}
            title="Psychometric Test for Management Trainee Officer"
            duration="30 min"
            questions="20"
            negativeMarking="-0.25/wrong"
          />
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded bg-white text-gray-400">
            {"<"}
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-[#6633FF] rounded bg-white text-[#6633FF] font-bold">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded bg-white text-gray-400">
            {">"}
          </button>
        </div>
        <div className="text-[14px] text-[#64748B]">
          Online Test Per Page{" "}
          <span className="ml-2 font-semibold border px-2 py-1 rounded inline-flex items-center gap-1 bg-white cursor-pointer">
            8 <span className="text-[10px]">▼</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const CandidateTestCard = ({ title, duration, questions, negativeMarking }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] flex flex-col gap-[20px] shadow-sm hover:shadow-md transition-shadow">
    <h3 className="font-['Inter'] font-semibold text-[18px] leading-[140%] text-[#334155]">
      {title}
    </h3>

    <div className="flex items-center gap-[24px] text-[14px] text-[#64748B]">
      {/* Duration */}
      <div className="flex items-center gap-[6px]">
        <div className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-full text-[10px]">
          🕒
        </div>
        <span>
          Duration: <strong className="text-[#334155]">{duration}</strong>
        </span>
      </div>

      {/* Questions */}
      <div className="flex items-center gap-[6px]">
        <div className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-full text-[10px]">
          📄
        </div>
        <span>
          Question: <strong className="text-[#334155]">{questions}</strong>
        </span>
      </div>

      {/* Negative Marking */}
      <div className="flex items-center gap-[6px]">
        <div className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-full text-[10px]">
          ✖
        </div>
        <span>
          Negative Marking:{" "}
          <strong className="text-[#334155]">{negativeMarking}</strong>
        </span>
      </div>
    </div>

    {/* Start Button: Matching Figma's outline style */}
    <button className="w-[140px] h-[40px] border border-[#6633FF] text-[#6633FF] font-semibold text-[14px] rounded-[8px] hover:bg-[#6633FF] hover:text-white transition-all">
      Start
    </button>
  </div>
);

export default CandidateDashboard;
