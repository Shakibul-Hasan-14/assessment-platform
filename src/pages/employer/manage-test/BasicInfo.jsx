import { useNavigate } from "react-router-dom";
import useBasicInfo from "../../../hooks/useBasicInfo";

const BasicInfo = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, onSubmit, errors, getDuration } =
    useBasicInfo();

  return (
    <div className="flex-1 bg-[#F8FAFC] px-[80px] py-[32px] flex flex-col gap-[24px]">
      {/* Header Card */}
      <div className="w-full bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-semibold text-[#334155]">
            Manage Online Test
          </h2>
          <button
            onClick={() => navigate("/employer/dashboard")}
            className="px-[20px] py-[10px] border border-[#E5E7EB] rounded-[12px] text-[#475569] text-[14px] font-medium hover:bg-gray-50"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-[40px]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[32px] h-[32px] bg-[#6633FF] text-white rounded-full flex items-center justify-center font-bold text-[14px]">
              1
            </div>
            <span className="text-[#6633FF] font-semibold text-[14px]">
              Basic Info
            </span>
          </div>
          <div className="h-[1px] w-[64px] bg-[#E5E7EB]" />
          <div className="flex items-center gap-[12px]">
            <div className="w-[32px] h-[32px] bg-[#E2E8F0] text-[#64748B] rounded-full flex items-center justify-center font-bold text-[14px]">
              2
            </div>
            <span className="text-[#64748B] font-medium text-[14px]">
              Questions
            </span>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="w-full bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-[32px]">
            <h3 className="text-[18px] font-semibold text-[#334155] mb-[24px]">
              Basic Information
            </h3>

            <div className="grid grid-cols-2 gap-x-[24px] gap-y-[20px]">
              {/* Title */}
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#475569]">
                  Online Test Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter online test title"
                  {...register("title")}
                  className={`w-full h-[48px] px-4 rounded-xl border outline-none transition-all
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
                  className={`w-full h-[48px] px-4 rounded-xl border outline-none transition-all
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
                  className={`w-full h-[48px] px-4 rounded-xl border outline-none transition-all
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
                  className={`w-full h-[48px] px-4 rounded-xl border outline-none transition-all
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
                  className={`w-full h-[48px] px-4 rounded-xl border outline-none bg-white appearance-none transition-all
                    ${errors.questionType ? "border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
                >
                  <option value="">Select question type</option>
                  <option value="mcq">MCQ</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="paragraph">Paragraph</option>
                </select>
                <span className="absolute right-4 bottom-3 text-gray-400 pointer-events-none">
                  ▼
                </span>
                {errors.questionType && (
                  <span className="text-xs text-red-500">
                    {errors.questionType.message}
                  </span>
                )}
              </div>

              {/* Start Time */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#475569]">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  {...register("startTime")}
                  className={`w-full h-[48px] px-4 rounded-xl border outline-none transition-all
                    ${errors.startTime ? "border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
                />
                {errors.startTime && (
                  <span className="text-xs text-red-500">
                    {errors.startTime.message}
                  </span>
                )}
              </div>

              {/* End Time */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#475569]">
                  End Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  {...register("endTime")}
                  className={`w-full h-[48px] px-4 rounded-xl border outline-none transition-all
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
                  placeholder="Auto calculated from start and end time"
                  className="w-full h-[48px] px-4 rounded-xl bg-gray-50 border border-[#E5E7EB] text-[#94A3B8]"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-[32px] py-[24px] bg-white border-t border-[#E5E7EB] flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/employer/dashboard")}
              className="px-[48px] py-[12px] border border-[#E5E7EB] rounded-[12px] text-[#475569] font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-[48px] py-[12px] bg-[#6633FF] text-white rounded-[12px] font-semibold hover:bg-[#5522EE] transition-all"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInfo;
