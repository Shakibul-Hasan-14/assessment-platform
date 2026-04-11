import { useNavigate } from "react-router-dom";
import useBasicInfo from "../../../hooks/useBasicInfo";

const BasicInfo = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, onSubmit, errors, getDuration } =
    useBasicInfo();

  return (
    <div className="flex-1 bg-[#F8FAFC] px-20 py-8 flex flex-col gap-6">
      {/* Header Card */}
      <div className="max-w-7xl w-full mx-auto bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-semibold text-[#334155]">
            Manage Online Test
          </h2>
        </div>

        {/* Stepper */}
        <div className="flex justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#6633FF] text-white rounded-full flex items-center justify-center font-bold text-[14px]">
                1
              </div>
              <span className="text-[#6633FF] font-semibold text-[14px]">
                Basic Info
              </span>
            </div>
            <div className="h-px w-16 bg-[#E5E7EB]" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#E2E8F0] text-[#64748B] rounded-full flex items-center justify-center font-bold text-[14px]">
                2
              </div>
              <span className="text-[#64748B] font-medium text-[14px]">
                Questions
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/employer/dashboard")}
            className="cursor-pointer px-5 py-2.5 border border-[#E5E7EB] rounded-xl text-[#475569] text-[14px] font-medium hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-238.5 w-full mx-auto bg-white border-[#E5E7EB] rounded-2xl overflow-hidden">
          <div className="p-8">
            <h3 className="text-[18px] font-semibold text-[#334155] mb-6">
              Basic Information
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              {/* Title */}
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#475569]">
                  Online Test Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter online test title"
                  {...register("title")}
                  className={`w-full h-12 px-4 rounded-xl border outline-none transition-all
                    ${errors.title ? "border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
                />
                {errors.title && (
                  <span className="text-xs text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* Total Candidates */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#475569]">
                  Total Candidates <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter total candidates"
                  {...register("totalCandidates")}
                  className={`w-full h-12 px-4 rounded-xl border outline-none transition-all
                    ${errors.totalCandidates ? "border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
                />
                {errors.totalCandidates && (
                  <span className="text-xs text-red-500">
                    {errors.totalCandidates.message}
                  </span>
                )}
              </div>

              {/* Total Slots */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#475569]">
                  Total Slots <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter total slots"
                  {...register("totalSlots")}
                  className={`w-full h-12 px-4 rounded-xl border outline-none transition-all
                    ${errors.totalSlots ? "border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
                />
                {errors.totalSlots && (
                  <span className="text-xs text-red-500">
                    {errors.totalSlots.message}
                  </span>
                )}
              </div>

              {/* Total Question Sets */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#475569]">
                  Total Question Set <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter total question sets"
                  {...register("totalExams")}
                  className={`w-full h-12 px-4 rounded-xl border outline-none transition-all
                    ${errors.totalExams ? "border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
                />
                {errors.totalExams && (
                  <span className="text-xs text-red-500">
                    {errors.totalExams.message}
                  </span>
                )}
              </div>

              {/* Question Type */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[14px] font-medium text-[#475569]">
                  Question Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("questionType")}
                  className={`w-full h-12 px-4 rounded-xl border outline-none bg-white appearance-none transition-all
                    ${errors.questionType ? "border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
                >
                  <option value="">Select question type</option>
                  <option value="mcq">MCQ</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="paragraph">Paragraph</option>
                </select>

                <img
                  src="/icons/arrow-down.svg"
                  alt="Dropdown"
                  className="h-6 aspect-square absolute right-4 bottom-3  pointer-events-none"
                />
                {errors.questionType && (
                  <span className="text-xs text-red-500">
                    {errors.questionType.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-x-6 gap-y-5 mt-5">
              {/* Start Time */}
              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-[14px] font-medium text-[#475569]">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  {...register("startTime")}
                  className={`w-full h-12 px-4 rounded-xl border outline-none transition-all
      ${errors.startTime ? "border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
                />
                {errors.startTime && (
                  <span className="text-xs text-red-500">
                    {errors.startTime.message}
                  </span>
                )}
              </div>

              {/* End Time */}
              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-[14px] font-medium text-[#475569]">
                  End Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  {...register("endTime")}
                  className={`w-full h-12 px-4 rounded-xl border outline-none transition-all
      ${errors.endTime ? "border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
                />
                {errors.endTime && (
                  <span className="text-xs text-red-500">
                    {errors.endTime.message}
                  </span>
                )}
              </div>

              {/* Duration — auto calculated */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#475569]">
                  Duration
                </label>
                <input
                  disabled
                  type="text"
                  value={getDuration()}
                  placeholder="Duration  Time"
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-[#E5E7EB] text-[#94A3B8]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-238.5 w-full mx-auto bg-white border-[#E5E7EB] rounded-2xl overflow-hidden mt-6">
          <div className="px-8 py-6 bg-white  border-[#E5E7EB] flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate("/employer/dashboard")}
              className="px-12 py-3 border border-[#E5E7EB] rounded-xl text-[#475569] font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-12 py-3 bg-[#6633FF] text-white rounded-xl font-semibold hover:bg-[#5522EE] transition-all"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicInfo;
