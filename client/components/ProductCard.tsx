import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import PriceView from "./PriceView";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import Title from "./Title";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group overflow-hidden rounded-lg text-sm">
      <div className="relative overflow-hidden bg-linear-to-r from-zinc-200 via-zinc-300 to-zinc-200">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              width={500}
              height={500}
              // loading="lazy"
              priority
              className={`h-72 w-full overflow-hidden object-contain transition-transform duration-500 ${product?.stock !== 0 && "group-hover:scale-105"}`}
            />
          </Link>
        )}
        {product?.stock === 0 && (
          <div className="bg-darkColor/50 absolute top-0 left-0 flex h-full w-full items-center justify-center">
            <p className="text-center text-base font-semibold text-white">
              Out of Stock
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 rounded-md rounded-tl-none rounded-tr-none border border-t-0 bg-zinc-50 px-2 py-3">
        <Title className="line-clamp-1 text-base">{product?.name}</Title>
        <p>{product?.intro}</p>
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-lg"
        />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
