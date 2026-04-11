import { useNavigate } from "react-router-dom";
import useTests from "../../hooks/useTests";
import TestCard from "../../components/employer/TestCard";

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
    <div className="max-w-7xl w-full h-full mx-auto flex-1 py-10 flex flex-col gap-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[24px] leading-[130%] text-[#334155]">
          Online Tests
        </h2>
        <div className="flex items-center">
          {/* Search */}
          <div className="relative p-px rounded-xl bg-linear-to-r from-[#A086F7] via-[#ECDBFF] via-[15.72%] to-[#B199FF]">
            <input
              type="text"
              placeholder="Search by exam title"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-155.25 h-12 pl-4 pr-11 rounded-[11px] bg-white focus:outline-none text-[14px] placeholder:text-[#94A3B8] block"
            />

            {/* Search Icon */}
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

        <div>
          <button
            onClick={() => navigate("/employer/manage-test/basic-info")}
            className="cursor-pointer h-12 px-6 bg-[#6633FF] text-white font-semibold text-[16px] rounded-xl hover:bg-[#5522EE] transition-all"
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
        <div className="h-60 bg-white rounded-lg p-5 gap-5">
          <div className="flex-1 flex flex-col items-center text-[#334155] text-sm h-full gap-3">
            <img
              src="/icons/no-data.svg"
              alt="No Data"
              className="h-30 aspect-square"
            />
            <span className="font-semibold text-[20px] leading-[140%]">
              No Online Test Available
            </span>
            <span className="text-[14px] text-[#64748B]">
              Currently, there are no online tests available. Please check back
              later for updates.
            </span>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && !error && tests.length > 0 && (
        <div className="grid grid-cols-2 gap-6">
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
      {!loading && !error && tests.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            {/* Prev Button */}
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded bg-white text-gray-400 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              {"<"}
            </button>

            {/* Page Numbers */}
            {totalPages <= 0 ? (
              <button className="w-8 h-8 flex items-center justify-center border border-[#6633FF] rounded font-bold text-sm text-[#6633FF]">
                1
              </button>
            ) : (
              Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center border rounded font-bold text-sm cursor-pointer
            ${page === p ? "border-[#6633FF] text-[#6633FF]" : "border-[#E5E7EB] text-gray-400 bg-white"}`}
                >
                  {p}
                </button>
              ))
            )}

            {/* Next Button */}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages || totalPages <= 1}
              className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded bg-white text-gray-400 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              {">"}
            </button>
          </div>

          {/* Per Page Indicator */}
          <div className="flex text-[14px] text-[#666666] items-center">
            Online Test Per Page{" "}
            <span className="flex ml-2 font-semibold p-1 rounded bg-white items-center gap-2.5 px-2.5">
              8{" "}
              <img
                src="/icons/up-arrow.svg"
                alt="Up Arrow"
                className="h-4 aspect-square"
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
