import useCandidateTests from "../../hooks/useCandidateTests";

const CandidateDashboard = () => {
  const {
    tests,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    handleStartTest,
  } = useCandidateTests();

  return (
    <div className="flex-1 bg-[#F8FAFC] px-20 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[24px] leading-[130%] text-[#334155]">
          Online Tests
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by exam title"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-107.5 h-12 pl-4 pr-11 rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:border-[#6633FF] text-[14px] placeholder:text-[#94A3B8]"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6633FF]">
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
          No tests available.
        </div>
      )}

      {/* Cards */}
      {!loading && !error && tests.length > 0 && (
        <div className="grid grid-cols-2 gap-6">
          {tests.map((test) => (
            <CandidateTestCard
              key={test.id}
              title={test.title}
              duration={test.duration ? `${test.duration} min` : "N/A"}
              questions={test.totalQuestions ?? "N/A"}
              negativeMarking={
                test.negativeMarking ? `${test.negativeMarking}/wrong` : "N/A"
              }
              onStart={() => handleStartTest(test.id)}
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
            Online Test Per Page
            <span className="ml-2 font-semibold border px-2 py-1 rounded inline-flex items-center gap-1 bg-white cursor-pointer">
              8 <span className="text-[10px]">▼</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const CandidateTestCard = ({
  title,
  duration,
  questions,
  negativeMarking,
  onStart,
}) => (
  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow">
    <h3 className="font-semibold text-[18px] leading-[140%] text-[#334155]">
      {title}
    </h3>
    <div className="flex items-center gap-6 text-[14px] text-[#64748B]">
      <div className="flex items-center gap-1.5">
        <span>🕒</span>
        <span>
          Duration: <strong className="text-[#334155]">{duration}</strong>
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span>📄</span>
        <span>
          Question: <strong className="text-[#334155]">{questions}</strong>
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span>✖</span>
        <span>
          Negative Marking:{" "}
          <strong className="text-[#334155]">{negativeMarking}</strong>
        </span>
      </div>
    </div>
    <button
      onClick={onStart}
      className="w-35 h-10 border border-[#6633FF] text-[#6633FF] font-semibold text-[14px] rounded-lg hover:bg-[#6633FF] hover:text-white transition-all"
    >
      Start
    </button>
  </div>
);

export default CandidateDashboard;
