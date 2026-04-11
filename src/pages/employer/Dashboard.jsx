import { useNavigate } from "react-router-dom";
import useTests from "../../hooks/useTests";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const {
    tests,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
  } = useTests();

  return (
    <div className="flex-1 bg-[#F8FAFC] px-[80px] py-[40px] flex flex-col gap-[32px]">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[24px] leading-[130%] text-[#334155]">
          Online Tests
        </h2>
        <div className="flex items-center gap-[24px]">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by exam title"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
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

          <button
            onClick={() => navigate("/employer/manage-test")}
            className="h-[48px] px-[24px] bg-[#6633FF] text-white font-semibold text-[16px] rounded-[12px] hover:bg-[#5522EE] transition-all"
          >
            Create Online Test
          </button>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex-1 flex items-center justify-center text-[#94A3B8] text-sm">
          Loading tests...
        </div>
      )}

      {error && (
        <div className="w-full px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && tests.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-[#94A3B8] text-sm">
          No tests found.
        </div>
      )}

      {/* Cards Grid */}
      {!loading && !error && tests.length > 0 && (
        <div className="grid grid-cols-2 gap-[24px]">
          {tests.map((test) => (
            <TestCard
              key={test.id}
              title={test.title}
              candidates={test.totalCandidates ?? "Not Set"}
              questions={test.totalExams ?? "Not Set"}
              slots={test.totalSlots ?? "Not Set"}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded bg-white text-gray-400 disabled:opacity-40"
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 flex items-center justify-center border rounded font-bold text-sm
                  ${page === p ? "border-[#6633FF] text-[#6633FF]" : "border-[#E5E7EB] text-gray-400 bg-white"}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded bg-white text-gray-400 disabled:opacity-40"
            >
              {">"}
            </button>
          </div>
          <div className="text-[14px] text-[#64748B]">
            Online Test Per Page{" "}
            <span className="ml-2 font-semibold border p-1 rounded">8 ▾</span>
          </div>
        </div>
      )}
    </div>
  );
};

const TestCard = ({ title, candidates, questions, slots }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] flex flex-col gap-[20px] shadow-sm hover:shadow-md transition-shadow">
    <h3 className="font-semibold text-[18px] leading-[140%] text-[#334155]">
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
