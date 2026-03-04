import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "motion/react";
import Logo from "./Logo";
import Link from "next/link";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { headerData } from "@/constants";
import SocialMedia from "./SocialMedia";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <div
      className={`bg-darkColor/50 fixed inset-y-0 left-0 z-50 w-full transform shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        ref={sidebarRef}
        className="bg-darkColor text-primary-foreground border-r-hoverColor/30 flex h-full max-w-96 min-w-72 flex-col gap-6 border-r p-10"
      >
        <div className="flex items-center justify-between">
          <button onClick={onClose}>
            <Logo className="text-white">Tulos</Logo>
          </button>
          <button
            onClick={onClose}
            className="hoverEffect cursor-pointer hover:text-red-500"
          >
            <X />
          </button>
        </div>
        <div className="flex w-full flex-col items-start gap-5 font-semibold capitalize">
          {headerData.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`hoverEffect group relative text-white/70 hover:text-white ${pathname === item?.href && "text-white"}`}
              onClick={onClose}
            >
              {item.title}
              <span
                className={`hoverEffect absolute -bottom-0.5 left-1/2 h-0.5 w-0 bg-white group-hover:left-0 group-hover:w-1/2 ${pathname === item?.href && "left-0 w-1/2"}`}
              />
              <span
                className={`hoverEffect absolute right-1/2 -bottom-0.5 h-0.5 w-0 bg-white group-hover:right-0 group-hover:w-1/2 ${pathname === item?.href && "right-0 w-1/2"}`}
              />
            </Link>
          ))}
        </div>
        {/* <div className="flex flex-col gap-3.5 text-base font-semibold tracking-wide text-zinc-400">
          <Link
            onClick={onClose}
            href={"/"}
            className={`hoverEffect hover:text-white ${
              pathname === `/` && "text-white"
            }`}
          >
            Home
          </Link>
          {categories?.map((item) => (
            <Link
              onClick={onClose}
              key={item?.title}
              href={`/category/${item?.slug?.current}`}
              className={`hoverEffect hover:text-white ${
                pathname === `/category/${item?.slug?.current}` && "text-white"
              }`}
            >
              {item?.title}
            </Link>
          ))}
        </div> */}
        <SocialMedia />
      </motion.div>
    </div>
  );
};

export default Sidebar;
