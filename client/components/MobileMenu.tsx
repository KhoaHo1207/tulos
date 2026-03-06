"use client";

import { AlignLeft } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { CATEGORIES_QUERYResult } from "@/sanity.types";

const MobileMenu = ({ categories }: { categories: CATEGORIES_QUERYResult }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <button onClick={toggleSidebar}>
        <AlignLeft className="hover:text-hoverColor hoverEffect h-6 w-6 md:hidden" />
      </button>
      <div className="md:hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          categories={categories}
        />
      </div>
    </>
  );
};

export default MobileMenu;
