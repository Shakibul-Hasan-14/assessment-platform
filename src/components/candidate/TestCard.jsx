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
      className="cursor-pointer w-35 h-10 border border-[#6633FF] text-[#6633FF] font-semibold text-[14px] rounded-lg hover:bg-[#6633FF] hover:text-white transition-all"
    >
      Start
    </button>
  </div>
);

export default CandidateTestCard;
