const TestCard = ({ title, candidates, questions, slots }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow">
    <h3 className="font-semibold text-[20px] leading-[140%] text-[#334155]">
      {title}
    </h3>
    <div className="flex items-center gap-6 text-[14px] text-[#64748B]">
      <div className="flex items-center gap-2">
        <img src="/icons/users.svg" alt="Users" className="h-6 aspect-square" />
        <span>
          Candidates: <strong>{candidates}</strong>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <img src="/icons/file.svg" alt="File" className="h-6 aspect-square" />
        <span>
          Question Set: <strong>{questions}</strong>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <img src="/icons/clock.svg" alt="Clock" className="h-6 aspect-square" />
        <span>
          Exam Slots: <strong>{slots}</strong>
        </span>
      </div>
    </div>
    <button className="cursor-pointer w-41 h-10 border border-[#6633FF] text-[#6633FF] font-semibold text-[14px] rounded-lg hover:bg-[#6633FF]/5 transition-colors">
      View Candidates
    </button>
  </div>
);

export default TestCard;
