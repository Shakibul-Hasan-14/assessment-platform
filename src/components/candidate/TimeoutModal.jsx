const TimeoutModal = ({ user, onBack }) => (
  <div className="fixed inset-0 bg-[#334155]/60 flex items-center justify-center z-50">
    <div className="bg-white p-12 rounded-3xl max-w-5xl w-full text-center flex flex-col items-center gap-4">
      <img src="/icons/timeout.svg" alt="Timeout" className="h-14 aspect-square"/>
      <h2 className="text-[24px] font-bold text-[#334155]">Timeout!</h2>
      <p className="text-[#64748B]">
        Dear {user?.name}, your exam time has finished. Thank you for
        participating.
      </p>
      <button
        onClick={onBack}
        className="px-6 py-3 border border-[#E5E7EB] rounded-xl font-semibold mt-4 hover:bg-gray-50 cursor-pointer"
      >
        Back to Dashboard
      </button>
    </div>
  </div>
);

export default TimeoutModal;
