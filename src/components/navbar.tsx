"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bug } from "lucide-react";
import { Routes } from "@/constants";
import { cn } from "@/lib/utils";

function Navbar() {
  const currentPath = usePathname();

  const links = useMemo(
    () => [
      {
        href: Routes.DASHBOARD,
        label: "Dashboard",
      },
      {
        href: Routes.ISSUES,
        label: "Issues",
      },
    ],
    []
  );

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={Routes.DASHBOARD}>
        <Bug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            key={`${link.label}-${link.href}`}
            className={cn({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
