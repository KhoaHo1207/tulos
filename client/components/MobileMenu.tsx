"use client";

import { AlignLeft } from "lucide-react";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function MobileMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsSidebarOpen(true)} className="cursor-pointer">
        <AlignLeft className="hover:text-darkColor hoverEffect md:hidden" />
      </button>
      <div className="md:hidden">
        {isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
}
