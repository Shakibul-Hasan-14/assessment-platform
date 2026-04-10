import { useNavigate } from "react-router-dom";

function Header({ pageTitle }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <header className="relative w-full h-16 lg:h-20 bg-white shadow-[0px_2.71px_4.4px_0px_#C0C0C007,0px_6.86px_11.12px_0px_#C0C0C00A,0px_14px_22.68px_0px_#C0C0C00C,0px_28.84px_46.72px_0px_#C0C0C00F,0px_79px_128px_0px_#C0C0C017]">
      <div className="max-w-7xl h-full mx-auto px-6 flex items-center justify-between">
        {/* Left — Logo */}
        <img
          src="/logo.svg"
          alt="Akij Resource"
          className="w-24 md:w-29 h-auto object-contain"
        />

        {/* Center — Title (absolutely centered) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-semibold text-sm lg:text-2xl leading-[130%] text-[#334155] text-center pointer-events-auto">
            {pageTitle || "Akij Resource"}
          </span>
        </div>

        {/* Right — User info (only when logged in) */}
        {user ? (
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[#334155]">
                {user.name}
              </span>
              <span className="text-xs text-gray-500">
                Ref. ID - {user.refId}
              </span>
            </div>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        ) : (
          <div className="w-24 md:w-29" />
        )}
      </div>
    </header>
  );
}

export default Header;
