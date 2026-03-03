import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export default function Logo({ children, className }: Props) {
  return (
    <Link
      href={"/"}
      className={cn(
        "text-darkColor text-2xl font-black tracking-wide",
        className,
      )}
    >
      {children}
    </Link>
  );
}
