import { useNavigate } from "react-router-dom";
import useBasicInfo from "../../../hooks/useBasicInfo";
import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";

const BasicInfo = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    getDuration,
    basicInfo,
    isViewMode,
  } = useBasicInfo();

  return (
    <div className="flex-1 bg-[#F8FAFC] px-20 py-8 flex flex-col gap-6">
      {/* Header Card */}
      <div className="max-w-7xl w-full mx-auto bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col gap-6">
        <h2 className="text-[20px] font-semibold text-[#334155]">
          Manage Online Test
        </h2>

        {/* Stepper */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() =>
                navigate("/employer/manage-test/basic-info?mode=view")
              }
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-[#6633FF] text-white rounded-full flex items-center justify-center font-bold text-[14px]">
                1
              </div>
              <span className="text-[#6633FF] font-semibold text-[14px]">
                Basic Info
              </span>
            </button>

            <div className="h-px w-16 bg-[#E5E7EB]" />

            {/* Step 2 */}
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

      {/* View Mode */}
      {isViewMode && basicInfo ? (
        <div className="max-w-5xl w-full mx-auto bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden">
          <div className="p-8 flex flex-col gap-6">
            {/* View Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-[18px] font-semibold text-[#334155]">
                Basic Information
              </h3>
              <button
                onClick={() => navigate("/employer/manage-test/basic-info")}
                className="cursor-pointer flex items-center gap-2 text-[#6633FF] font-medium text-[14px] hover:underline"
              >
                ✎ Edit
              </button>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-4 gap-y-8">
              <SummaryItem
                label="Online Test Title"
                value={basicInfo.title}
                fullWidth
              />
              <SummaryItem
                label="Total Candidates"
                value={basicInfo.totalCandidates}
              />
              <SummaryItem label="Total Slots" value={basicInfo.totalSlots} />
              <SummaryItem
                label="Total Question Set"
                value={basicInfo.totalExams}
              />
              <SummaryItem
                label="Duration Per Slots (Minutes)"
                value={getDuration()}
              />
              <SummaryItem
                label="Question Type"
                value={basicInfo.questionType?.toUpperCase()}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-[#E5E7EB] flex justify-end">
            <button
              onClick={() => navigate("/employer/manage-test/questions")}
              className="cursor-pointer px-12 py-3 bg-[#6633FF] text-white rounded-xl font-semibold hover:bg-[#5522EE] transition-all"
            >
              Continue to Questions
            </button>
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="max-w-5xl w-full mx-auto bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden">
            <div className="p-8 flex flex-col gap-6">
              <h3 className="text-[18px] font-semibold text-[#334155]">
                Basic Information
              </h3>

              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <div className="col-span-2">
                  <FormInput
                    label="Online Test Title"
                    type="text"
                    placeholder="Enter online test title"
                    error={errors.title?.message}
                    required
                    {...register("title")}
                  />
                </div>

                <FormInput
                  label="Total Candidates"
                  type="number"
                  placeholder="Enter total candidates"
                  error={errors.totalCandidates?.message}
                  required
                  {...register("totalCandidates")}
                />

                <FormSelect
                  label="Total Slots"
                  error={errors.totalSlots?.message}
                  required
                  {...register("totalSlots")}
                >
                  <option value="">Select total slots</option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </FormSelect>

                <FormInput
                  label="Total Question Set"
                  type="number"
                  placeholder="Enter total question sets"
                  error={errors.totalExams?.message}
                  required
                  {...register("totalExams")}
                />

                <FormSelect
                  label="Question Type"
                  error={errors.questionType?.message}
                  required
                  {...register("questionType")}
                >
                  <option value="">Select question type</option>
                  <option value="mcq">MCQ</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="paragraph">Paragraph</option>
                </FormSelect>
              </div>

              <div className="grid grid-cols-5 gap-x-6">
                <div className="col-span-2">
                  <FormInput
                    label="Start Time"
                    type="time"
                    error={errors.startTime?.message}
                    required
                    {...register("startTime")}
                  />
                </div>
                <div className="col-span-2">
                  <FormInput
                    label="End Time"
                    type="time"
                    error={errors.endTime?.message}
                    required
                    {...register("endTime")}
                  />
                </div>
                <div className="col-span-1">
                  <FormInput
                    label="Duration"
                    type="text"
                    value={getDuration()}
                    placeholder="Duration Time"
                    disabled
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="max-w-5xl w-full mx-auto bg-white border border-[#E5E7EB] rounded-2xl px-8 py-6 flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/employer/dashboard")}
              className="cursor-pointer px-12 py-3 border border-[#E5E7EB] rounded-xl text-[#475569] font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-12 py-3 bg-[#6633FF] text-white rounded-xl font-semibold hover:bg-[#5522EE] transition-all"
            >
              Save & Continue
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const SummaryItem = ({ label, value, fullWidth }) => (
  <div
    className={`${fullWidth ? "col-span-4" : "col-span-1"} flex flex-col gap-1`}
  >
    <span className="text-[14px] text-[#94A3B8] font-medium tracking-wider">
      {label}
    </span>
    <span className="text-[16px] text-[#334155] font-semibold">
      {value || "—"}
    </span>
  </div>
);

export default BasicInfo;
