function Footer() {
  return (
    <footer className="w-full bg-[#130B2C] shadow-[0px_2.71px_4.4px_0px_#C0C0C007,0px_6.86px_11.12px_0px_#C0C0C00A,0px_14px_22.68px_0px_#C0C0C00C,0px_28.84px_46.72px_0px_#C0C0C00F,0px_79px_128px_0px_#C0C0C017]">
      <div className="max-w-7xl w-full mx-auto py-5 md:py-0 md:h-20 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        {/* Left — Powered by + Logo */}
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
          <span className="font-normal text-base md:text-xl leading-[130%] text-white">
            Powered by
          </span>
          <img
            src="/logo-white.svg"
            alt="Akij Resource"
            className="w-24 md:w-29 h-8 object-contain"
          />
        </div>

        {/* Right — Helpline + Email */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white text-sm md:text-base font-semibold leading-[150%]">
          {/* Helpline label + phone */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
            <span>Helpline</span>
            <div className="flex items-center gap-1">
              <img
                src="/icons/phone.svg"
                alt="phone"
                className="w-5 h-5 md:w-6 md:h-6 object-contain"
              />
              <span>+88 011020202505</span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <img
              src="/icons/mail.svg"
              alt="mail"
              className="w-5 h-5 md:w-6 md:h-6 object-contain"
            />
            <span>support@akij.work</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
