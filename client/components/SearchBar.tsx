"use client";
import { Loader2, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { client } from "@/sanity/lib/client";
import { Input } from "@/components/ui/input";
import AddToCartButton from "@/components/AddToCartButton";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity.types";
import PriceView from "@/components/PriceView";
import Image from "next/image";
import Link from "next/link";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Fetch products from Sanity based on search input
  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)`;
      const params = { search: `${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  // Debounce input changes to reduce API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300); // Delay of 300ms

    return () => clearTimeout(debounceTimer); // Cleanup the timer
  }, [search, fetchProducts]);
  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger
        onClick={() => setShowSearch(!showSearch)}
        className="flex items-center hover:cursor-pointer"
      >
        <Search className="hover:text-darkColor hoverEffect h-5 w-5" />
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] min-h-[90vh] max-w-5xl flex-col overflow-hidden bg-white sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="mb-3">Product Searchbar</DialogTitle>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Search your product here..."
              className="flex-1 rounded-md py-5 font-semibold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <X
                onClick={() => setSearch("")}
                className="hoverEffect absolute top-3 right-11 h-4 w-4 hover:text-red-600"
              />
            )}
            <button
              type="submit"
              className="bg-darkColor/10 hover:bg-darkColor hoverEffect absolute top-0 right-0 flex h-full w-10 items-center justify-center rounded-tr-md hover:text-white"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </DialogHeader>
        <div className="border-darkColor/20 h-full w-full overflow-y-scroll rounded-md border bg-white">
          <div className="">
            {loading ? (
              <p className="flex items-center gap-1 px-6 py-10 text-center font-semibold text-green-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                Searching on progress...
              </p>
            ) : products?.length ? (
              products.map((product: Product) => (
                <div
                  key={product?._id}
                  className="overflow-hidden border-b bg-white"
                >
                  <div className="flex items-center p-1">
                    <Link
                      href={`/product/${product?.slug?.current}`}
                      onClick={() => setShowSearch(false)}
                      className="border-darkColor/20 group h-20 w-20 shrink-0 overflow-hidden rounded-md border md:h-24 md:w-24"
                    >
                      {product?.images && (
                        <Image
                          width={200}
                          height={200}
                          src={urlFor(product?.images[0]).url()}
                          alt={"productImage"}
                          className="hoverEffect h-full w-full object-cover group-hover:scale-110"
                        />
                      )}
                    </Link>
                    <div className="grow px-4 py-2">
                      <div className="flex items-start justify-between">
                        <Link
                          href={`/product/${product?.slug?.current}`}
                          onClick={() => setShowSearch(false)}
                        >
                          <h3 className="line-clamp-1 text-sm font-semibold text-gray-800 md:text-lg">
                            {product.name}
                          </h3>
                          <p className="line-clamp-1 text-sm text-gray-600">
                            {product?.intro}
                          </p>
                        </Link>
                        <PriceView
                          price={product?.price}
                          discount={product?.discount}
                          className="md:text-lg"
                        />
                      </div>

                      <div className="mt-1 w-60">
                        <AddToCartButton product={product} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center font-semibold tracking-wide">
                {search && products?.length ? (
                  <p>
                    Nothing match with the keyword{" "}
                    <span className="text-red-600 underline">{search}</span>.
                    Please try something else.
                  </p>
                ) : (
                  <p className="flex items-center justify-center gap-1 text-green-600">
                    <Search className="h-5 w-5" />
                    Search and explore your products from Tulos.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
