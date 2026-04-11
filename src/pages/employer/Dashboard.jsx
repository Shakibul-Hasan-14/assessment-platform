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
    <div className="max-w-7xl w-full mx-auto flex-1 px-4 md:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-6 md:gap-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="font-semibold text-xl md:text-[24px] leading-[130%] text-[#334155]">
          Online Tests
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
              className="w-full sm:w-72 lg:w-107.5 h-12 pl-4 pr-11 rounded-[11px] bg-white focus:outline-none text-[14px] placeholder:text-[#94A3B8] block"
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

          <button
            onClick={() => navigate("/employer/manage-test/basic-info")}
            className="cursor-pointer h-12 px-6 bg-[#6633FF] text-white font-semibold text-[16px] rounded-xl hover:bg-[#5522EE] transition-all whitespace-nowrap"
          >
            Create Online Test
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex-1 flex items-center justify-center text-[#94A3B8] text-sm">
          Loading tests...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="w-full px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && tests.length === 0 && (
        <div className="bg-white rounded-lg p-5">
          <div className="flex flex-col items-center justify-center text-[#334155] h-full gap-3 py-10">
            <img
              src="/icons/no-data.svg"
              alt="No Data"
              className="h-24 md:h-30 aspect-square"
            />
            <span className="font-semibold text-lg md:text-[20px] leading-[140%]">
              No Online Test Available
            </span>
            <span className="text-[14px] text-[#64748B] text-center max-w-sm">
              Currently, there are no online tests available. Please check back
              later for updates.
            </span>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && !error && tests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mt-4">
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded bg-white text-gray-400 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              {"<"}
            </button>

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

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages || totalPages <= 1}
              className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded bg-white text-gray-400 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              {">"}
            </button>
          </div>

          <div className="flex text-[14px] text-[#666666] items-center">
            Online Test Per Page
            <span className="flex ml-2 font-semibold p-1 rounded bg-white items-center gap-2.5 px-2.5">
              8
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
