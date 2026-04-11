import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useLogin from "../../hooks/useLogin";
import FormInput from "../../components/ui/FormInput";

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
      <div className="w-full max-w-142.75 flex flex-col items-center gap-6 px-4">
        <h2 className="font-semibold text-[24px] leading-[130%] text-[#334155]">
          Sign In
        </h2>

        <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl px-8 pt-8 pb-10 shadow-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {error && (
              <div className="w-full px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <FormInput
              label="Email"
              type="email"
              placeholder="Your primary email address"
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="flex flex-col gap-2">
              <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
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

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full h-12 bg-[#6633FF] text-white font-semibold text-base rounded-lg hover:bg-[#5522EE] transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
