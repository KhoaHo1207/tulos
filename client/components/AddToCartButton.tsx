"use client";
import { Product } from "@/sanity.types";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const isOutOfStock = product?.stock === 0;

  return (
    <div className="flex h-12 w-full items-center">
      <Button
        disabled={isOutOfStock}
        className={cn(
          "text-darkColor border-darkColor/30 hoverEffect w-full cursor-pointer border bg-transparent font-semibold tracking-wide shadow-none hover:text-white",
          className,
        )}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default AddToCartButton;
