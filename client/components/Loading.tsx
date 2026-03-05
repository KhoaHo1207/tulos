"use client";

import Logo from "@/components/Logo";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 flex min-h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-1">
        <Logo>Tulos</Logo>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-darkColor flex items-center space-x-2"
        >
          <Loader2 className="text-darkColor animate-spin" />
          <span className="text-darkColor font-semibold tracking-wide">
            Tulos is loading...
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
