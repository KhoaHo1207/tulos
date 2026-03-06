"use client";
import { CATEGORIES_QUERYResult, Product } from "@/sanity.types";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import NoProductAvailable from "./NoProductAvailable";

interface Props {
  categories: CATEGORIES_QUERYResult;
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (categorySlug: string) => {
    try {
      setLoading(true);
      const query = `
        *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)
      `;

      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug]);

  return (
    <div className="flex flex-col items-start gap-5 py-5 md:flex-row">
      <div className="flex flex-col border md:min-w-40">
        {categories?.map((item) => (
          <Button
            key={item?._id}
            onClick={() => setCurrentSlug(item?.slug?.current as string)}
            className={`text-darkColor hover:bg-darkColor hoverEffect rounded-none border-0 border-b bg-transparent font-semibold shadow-none last:border-b-0 hover:text-white ${item?.slug?.current === currentSlug && "bg-darkColor border-darkColor text-white"}`}
          >
            {item?.title}
          </Button>
        ))}
      </div>
      <div className="w-full">
        {loading ? (
          <div className="flex min-h-80 w-full flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 py-10 text-center">
            <motion.div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Product is loading...</span>
            </motion.div>
          </div>
        ) : products?.length ? (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <>
              {products?.map((product: Product) => (
                <AnimatePresence key={product?._id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductCard key={product?._id} product={product} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </>
          </div>
        ) : (
          <NoProductAvailable
            selectedTab={currentSlug}
            className="mt-0 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
