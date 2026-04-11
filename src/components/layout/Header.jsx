import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../store/authSlice";

function Header({ pageTitle }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="relative w-full h-16 lg:h-20 bg-white shadow-[0px_2.71px_4.4px_0px_#C0C0C007,0px_6.86px_11.12px_0px_#C0C0C00A,0px_14px_22.68px_0px_#C0C0C00C,0px_28.84px_46.72px_0px_#C0C0C00F,0px_79px_128px_0px_#C0C0C017]">
      <div className="max-w-7xl w-full h-full mx-auto flex items-center justify-between px-3 lg:px-0">
        {/* Left — Logo */}
        <div className="w-32 md:w-40">
          <img
            src="/logo.svg"
            alt="Akij Resource"
            className="w-24 md:w-29 h-auto object-contain"
          />
        </div>

        {/* Center — Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-semibold text-sm lg:text-2xl leading-[130%] text-[#334155] text-center pointer-events-auto">
            {pageTitle || "Akij Resource"}
          </span>
        </div>

        {/* Right — User info or spacer */}
        <div className="w-32 md:w-40 flex justify-end">
          {user ? (
            <div className="relative">
              {/* Trigger */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <div className="hidden lg:block">
                  <div className="flex flex-col leading-tight w-25">
                    <span className="text-[14px] font-semibold text-[#334155]">
                      {user.name}
                    </span>
                    <span className="text-[12px] text-[#64748B]">
                      Ref. ID - {user.refId}
                    </span>
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
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

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-40 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-sm text-left text-red-500 font-medium hover:bg-red-50 transition-all"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
