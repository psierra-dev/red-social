"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LinkCustom = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();
  return (
    <Link href={href}>
      <div
        className="p-2 flex items-center rounded-md justify-center hover:bg-[#80808056]"
      >
        {children}
      </div>
    </Link>
  );
};

export default LinkCustom;
