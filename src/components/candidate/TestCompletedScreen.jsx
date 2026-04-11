const TestCompletedScreen = ({ user, test, onBack }) => (
  <div className=" flex-1 bg-[#F8FAFC] flex flex-col items-center p-6 text-center">
    <div className="max-w-7xl mx-auto w-full bg-white p-15 rounded-4xl border border-[#E5E7EB] shadow-sm flex flex-col items-center gap-6">
      <img
        src="/icons/complete.svg"
        alt="Test Completed"
        className="h-14 aspect-square"
      />
      <h2 className="text-[28px] font-bold text-[#334155]">Test Completed</h2>
      <p className="text-[#64748B] text-[18px] leading-relaxed">
        Congratulations! {user?.name}, you have completed your exam for{" "}
        {test?.title}. Thank you for participating.
      </p>
      <button
        onClick={onBack}
        className="mt-4 px-8 py-3.5 border border-[#E5E7EB] rounded-xl font-semibold text-[#475569] hover:bg-gray-50 cursor-pointer"
      >
        Back to Dashboard
      </button>
    </div>
  </div>
);

export default TestCompletedScreen;
