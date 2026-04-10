import React, { useState } from "react";

const BasicInfo = () => {
  const [isEditMode, setIsEditMode] = useState(true);

  return (
    <div className="flex-1 bg-[#F8FAFC] px-[80px] py-[32px] flex flex-col gap-[24px]">
      {/* Breadcrumb / Top Header Card */}
      <div className="w-full bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] flex flex-col gap-[24px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] font-semibold text-[#334155]">
            Manage Online Test
          </h2>
          <button className="px-[20px] py-[10px] border border-[#E5E7EB] rounded-[12px] text-[#475569] text-[14px] font-medium hover:bg-gray-50">
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

      {/* Content Card */}
      <div className="w-full bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden">
        <div className="p-[32px]">
          <div className="flex justify-between items-center mb-[24px]">
            <h3 className="text-[18px] font-semibold text-[#334155]">
              Basic Information
            </h3>
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-2 text-[#6633FF] font-medium text-[14px]"
              >
                <span>✎</span> Edit
              </button>
            )}
          </div>

          {isEditMode ? <EditForm /> : <ViewSummary />}
        </div>

        {/* Action Footer */}
        <div className="px-[32px] py-[24px] bg-white border-t border-[#E5E7EB] flex justify-between">
          <button className="px-[48px] py-[12px] border border-[#E5E7EB] rounded-[12px] text-[#475569] font-semibold">
            Cancel
          </button>
          <button
            onClick={() => setIsEditMode(false)}
            className="px-[48px] py-[12px] bg-[#6633FF] text-white rounded-[12px] font-semibold hover:bg-[#5522EE] transition-all"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const EditForm = () => (
  <div className="grid grid-cols-2 gap-x-[24px] gap-y-[20px]">
    <div className="col-span-2 flex flex-col gap-2">
      <label className="text-[14px] font-medium text-[#475569]">
        Online Test Title <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="Enter online test title"
        className="w-full h-[48px] px-4 rounded-xl border border-[#E5E7EB] focus:border-[#6633FF] outline-none"
      />
    </div>
    <FormInput label="Total Candidates" placeholder="Enter total candidates" />
    <FormSelect label="Total Slots" placeholder="Select total slots" />
    <FormSelect
      label="Total Question Set"
      placeholder="Select total question set"
    />
    <FormSelect label="Question Type" placeholder="Select question type" />
    <FormInput label="Start Time" placeholder="Enter start time" icon="🕒" />
    <FormInput label="End Time" placeholder="Enter end time" icon="🕒" />
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-medium text-[#475569]">Duration</label>
      <input
        disabled
        type="text"
        placeholder="Duration Time"
        className="w-full h-[48px] px-4 rounded-xl bg-gray-50 border border-[#E5E7EB]"
      />
    </div>
  </div>
);

const ViewSummary = () => (
  <div className="grid grid-cols-4 gap-y-[32px]">
    <SummaryItem
      label="Online Test Title"
      value="Psychometric Test for Management Trainee Officer"
      fullWidth
    />
    <SummaryItem label="Total Candidates" value="10,000" />
    <SummaryItem label="Total Slots" value="3" />
    <SummaryItem label="Total Question Set" value="2" />
    <SummaryItem label="Duration Per Slots (Minutes)" value="30" />
    <SummaryItem label="Question Type" value="MCQ" />
  </div>
);

/* Helper Components */
const FormInput = ({ label, placeholder, icon }) => (
  <div className="flex flex-col gap-2 relative">
    <label className="text-[14px] font-medium text-[#475569]">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full h-[48px] px-4 rounded-xl border border-[#E5E7EB] outline-none"
    />
    {icon && (
      <span className="absolute right-4 bottom-3 text-gray-400">{icon}</span>
    )}
  </div>
);

const FormSelect = ({ label, placeholder }) => (
  <div className="flex flex-col gap-2 relative">
    <label className="text-[14px] font-medium text-[#475569]">
      {label} <span className="text-red-500">*</span>
    </label>
    <select className="w-full h-[48px] px-4 rounded-xl border border-[#E5E7EB] outline-none bg-white appearance-none">
      <option value="">{placeholder}</option>
    </select>
    <span className="absolute right-4 bottom-3 text-gray-400">▼</span>
  </div>
);

const SummaryItem = ({ label, value, fullWidth }) => (
  <div
    className={`${fullWidth ? "col-span-4" : "col-span-1"} flex flex-col gap-1`}
  >
    <span className="text-[12px] text-[#94A3B8] font-medium uppercase tracking-wider">
      {label}
    </span>
    <span className="text-[16px] text-[#334155] font-semibold">{value}</span>
  </div>
);

export default BasicInfo;
