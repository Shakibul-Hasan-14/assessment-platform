import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary — will be replaced with MSW + Redux in stage 2/3
    // For now just navigate to test routing
    navigate("/employer/dashboard");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#F8FAFC]">
      <div className="w-full max-w-142.75 flex flex-col items-center gap-6 px-4">
        {/* Title */}
        <h2 className="font-semibold text-[24px] leading-[130%] text-[#334155]">
          Sign In
        </h2>

        {/* Card */}
        <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl px-8 pt-8 pb-10 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#475569]">
                Email
              </label>
              <input
                type="email"
                placeholder="Your primary email address"
                className="w-full h-12 px-3 rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#6633FF] transition-all placeholder:text-[#94A3B8] text-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#475569]">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full h-12 px-3 rounded-lg border border-[#E5E7EB] focus:outline-none focus:border-[#6633FF] transition-all placeholder:text-[#94A3B8] text-sm"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer text-[14px] text-[#334155] font-medium hover:underline"
                >
                  Forget Password?
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="cursor-pointer w-full h-12 bg-[#6633FF] text-white font-semibold text-base rounded-lg hover:bg-[#5522EE] transition-all mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
