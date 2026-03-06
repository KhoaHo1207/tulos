"use client";
import useCartStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const CartIcon = () => {
  const { items } = useCartStore();

  return (
    <Link href={"/cart"} className="group relative">
      <ShoppingBag className="group-hover:text-darkColor hoverEffect h-5 w-5" />
      <span className="bg-darkColor absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold text-white">
        {items?.length ? items?.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;
