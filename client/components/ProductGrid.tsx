"use client";

import { useEffect, useState } from "react";
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/constants";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";
import { Empty } from "./ui/empty";
import Loading from "./Loading";
import NoProductAvailable from "./NoProductAvailable";
export default function ProductGrid() {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = `*[_type == 'product' && variant == $variant] | order(name asc)`;

  const params = {
    variant: selectedTab.toLowerCase(),
  };

  console.log(params);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const response = await client.fetch(query, params);
        console.log("Product fetching response", await response);
        setProducts(response);
      } catch (error) {
        console.log("Product fetching error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [selectedTab]);

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <HomeTabbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {loading ? (
        <Loading />
      ) : products.length > 0 ? (
        <div className="mt-10 grid w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product: Product) => (
            <div key={product?._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
}
