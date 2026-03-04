"use client";

import { useEffect, useState } from "react";
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/constants";
import { client } from "@/sanity/lib/client";

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
        const response = await client.fetch(query, params);
        console.log("Product fetching response", await response);
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
    </div>
  );
}
