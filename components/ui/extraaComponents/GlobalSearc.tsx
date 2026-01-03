import Image from "next/image";
import React from "react";

const GlobalSearch = () => {
  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <Image
          src="/icons/search.svg"
          alt="search-logo"
          height={20}
          width={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 md:left-4 md:h-6 md:w-6"
        />
        <input
          type="text"
          placeholder="Search anything globally"
          className="background-light800_dark200 light-border-2 h-10 w-full rounded-lg border py-2 pl-10 pr-4 text-sm placeholder:font-inter placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 md:h-12 md:pl-12 md:text-base md:placeholder:text-base"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;