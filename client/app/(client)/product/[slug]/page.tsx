import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { getProductBySlug } from "@/sanity/helpers/queries";
import { Heart } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <Container className="flex flex-col gap-10 py-10 md:flex-row">
        {product?.images && <ImageView images={product?.images} />}
        <div className="flex w-full flex-col gap-5 md:w-1/2">
          <div>
            <p className="mb-2 text-4xl font-bold">{product?.name}</p>
            <PriceView
              price={product?.price}
              discount={product?.discount}
              className="text-lg font-bold"
            />
          </div>
          {product?.stock && product?.stock > 0 ? (
            <p className="w-24 rounded-lg bg-green-100 py-2.5 text-center text-sm font-semibold text-green-600">
              In Stock
            </p>
          ) : (
            <p className="w-24 rounded-lg bg-red-100 py-2.5 text-center text-sm font-semibold text-red-600">
              Out of Stock
            </p>
          )}

          <p className="text-sm tracking-wide text-gray-600">
            {product?.description}
          </p>
          <div className="flex items-center gap-2.5 lg:gap-5">
            <AddToCartButton
              product={product}
              className="bg-darkColor/80 hover:bg-darkColor hoverEffect text-white"
            />
            <button className="border-darkColor/30 text-darkColor/60 hover:text-darkColor hover:border-darkColor hoverEffect rounded-md border-2 px-2.5 py-1.5">
              <Heart className="h-5 w-5" />
            </button>
          </div>
          <ProductCharacteristics product={product} />
          <div className="-mt-2 flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5">
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <RxBorderSplit className="text-lg" />
              <p>Compare color</p>
            </div>
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <FaRegQuestionCircle className="text-lg" />
              <p>Ask a question</p>
            </div>
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <TbTruckDelivery className="text-lg" />
              <p>Delivery & Return</p>
            </div>
            <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
              <FiShare2 className="text-lg" />
              <p>Share</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <div className="border-darkBlue/20 hover:border-darkBlue hoverEffect rounded-md border p-3 text-center">
              <p className="text-base font-semibold text-black">
                Free Shipping
              </p>
              <p className="text-sm text-gray-500">
                Free shipping over order $120
              </p>
            </div>
            <div className="border-darkBlue/20 hover:border-darkBlue hoverEffect rounded-md border p-3 text-center">
              <p className="text-base font-semibold text-black">
                Flexible Payment
              </p>
              <p className="text-sm text-gray-500">
                Pay with Multiple Credit Cards
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
