import React from "react";

const EmployerDashboard = () => {
  return (
    <div className="flex-1 bg-[#F8FAFC] px-[80px] py-[40px] flex flex-col gap-[32px]">
      {/* Top Bar: Title + Search + Create Button */}
      <div className="flex items-center justify-between">
        <h2 className="font-['Inter'] font-semibold text-[24px] leading-[130%] text-[#334155]">
          Online Tests
        </h2>

        <div className="flex items-center gap-[24px]">
          {/* Search Input (width approx 400px based on visual) */}
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

          <button className="h-[48px] px-[24px] bg-[#6633FF] text-white font-semibold text-[16px] rounded-[12px] hover:bg-[#5522EE] transition-all">
            Create Online Test
          </button>
        </div>
      </div>

      {/* Test Cards Grid */}
      <div className="grid grid-cols-2 gap-[24px]">
        <TestCard
          title="Psychometric Test for Management Trainee Officer"
          candidates="10,000"
          questions="3"
          slots="3"
        />
        <TestCard
          title="Psychometric Test for Management Trainee Officer"
          candidates="10,000"
          questions="3"
          slots="3"
        />
        <TestCard
          title="Psychometric Test for Management Trainee Officer"
          candidates="Not Set"
          questions="Not Set"
          slots="Not Set"
        />
        <TestCard
          title="Psychometric Test for Management Trainee Officer"
          candidates="10,000"
          questions="3"
          slots="3"
        />
      </div>

      {/* Pagination Placeholder */}
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
          <span className="ml-2 font-semibold border p-1 rounded">8 ▾</span>
        </div>
      </div>
    </div>
  );
};

const TestCard = ({ title, candidates, questions, slots }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] flex flex-col gap-[20px] shadow-sm hover:shadow-md transition-shadow">
    <h3 className="font-['Inter'] font-semibold text-[18px] leading-[140%] text-[#334155]">
      {title}
    </h3>

    <div className="flex items-center gap-[24px] text-[14px] text-[#64748B]">
      <div className="flex items-center gap-[8px]">
        <span className="opacity-60">👥</span>
        <span>
          Candidates: <strong>{candidates}</strong>
        </span>
      </div>
      <div className="flex items-center gap-[8px]">
        <span className="opacity-60">📝</span>
        <span>
          Question Set: <strong>{questions}</strong>
        </span>
      </div>
      <div className="flex items-center gap-[8px]">
        <span className="opacity-60">🕒</span>
        <span>
          Exam Slots: <strong>{slots}</strong>
        </span>
      </div>
    </div>

    <button className="w-[140px] h-[40px] border border-[#6633FF] text-[#6633FF] font-semibold text-[14px] rounded-[8px] hover:bg-[#6633FF]/5 transition-colors">
      View Candidates
    </button>
  </div>
);

export default EmployerDashboard;
