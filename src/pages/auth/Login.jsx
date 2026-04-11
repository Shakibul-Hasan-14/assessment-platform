import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useLogin from "../../hooks/useLogin";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { login, loading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    login(data.email, data.password);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#F8FAFC]">
      <div className="w-full max-w-[571px] flex flex-col items-center gap-6 px-4">
        {/* Title */}
        <h2 className="font-semibold text-[32px] leading-[130%] text-[#334155]">
          Sign In
        </h2>

        {/* Card */}
        <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl px-8 pt-8 pb-10 shadow-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Global error */}
            {error && (
              <div className="w-full px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#475569]">
                Email
              </label>
              <input
                type="email"
                placeholder="Your primary email address"
                {...register("email")}
                className={`w-full h-12 px-3 rounded-lg border transition-all placeholder:text-[#94A3B8] text-sm focus:outline-none
                  ${errors.email ? "border-red-400 focus:border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#475569]">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className={`w-full h-12 px-3 rounded-lg border transition-all placeholder:text-[#94A3B8] text-sm focus:outline-none
                  ${errors.password ? "border-red-400 focus:border-red-400" : "border-[#E5E7EB] focus:border-[#6633FF]"}`}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-[#6633FF] font-medium hover:underline"
                >
                  Forget Password?
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#6633FF] text-white font-semibold text-base rounded-lg hover:bg-[#5522EE] transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
