import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function layout({ children }: Props) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  );
}
