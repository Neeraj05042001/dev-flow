import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "../Theme";
import GlobalSearch from "../../extraaComponents/GlobalSearc";


const Navbar = () => {
  return (
    <nav className="background-light900_dark200 fixed z-50 w-full shadow-light-300 dark:shadow-none">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:gap-5 sm:px-6 md:px-12 md:py-4">
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <Image
            src="/images/site-logo.svg"
            alt="devflow logo"
            height={23}
            width={23}
          />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 hidden sm:block">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>

        <div className="flex-1 max-w-2xl">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <Theme />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;