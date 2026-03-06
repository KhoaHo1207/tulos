"use client";
import Container from "@/components/Container";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Heart, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import EmptyCart from "@/components/EmptyCart";
import NoAccessToCart from "@/components/NoAccessToCart";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import paypalLogo from "@/images/paypalLogo.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Loading from "@/components/Loading";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loading />;
  }

  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      resetCart();
      toast.success("Your cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };
  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="text-darkColor h-6 w-6" />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid md:gap-8 lg:grid-cols-3">
                {/* Product View start */}
                <div className="rounded-lg lg:col-span-2">
                  <div className="rounded-md border bg-white">
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="flex items-center justify-between gap-5 border-b p-2.5 last:border-b-0"
                        >
                          <div className="flex h-36 flex-1 items-start gap-2 md:h-44">
                            {product?.images && (
                              <div className="group mr-2 overflow-hidden rounded-md border p-0.5 md:p-1">
                                <Image
                                  src={urlFor(product.images[0]).url()}
                                  alt="productImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="h-32 w-32 overflow-hidden object-cover transition-transform duration-500 group-hover:scale-105 md:h-40 md:w-40"
                                />
                              </div>
                            )}
                            <div className="flex h-full flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className="line-clamp-1 text-base font-semibold">
                                  {product?.name}
                                </h2>
                                <p className="text-lightColor text-sm font-medium">
                                  {product?.intro}
                                </p>
                                <p className="text-sm capitalize">
                                  Variant:{" "}
                                  <span className="font-semibold">
                                    {product?.variant}
                                  </span>
                                </p>
                                <p className="text-sm capitalize">
                                  Status:{" "}
                                  <span className="font-semibold">
                                    {product?.status}
                                  </span>
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Heart className="hoverEffect mr-1 h-4 w-4 text-gray-500 hover:text-red-600 md:h-5 md:w-5" />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold">
                                      Add to Favorite
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() =>
                                          handleDeleteProduct(product?._id)
                                        }
                                        className="hoverEffect mr-1 h-4 w-4 text-gray-500 hover:text-red-600 md:h-5 md:w-5"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-red-600 font-bold">
                                      Delete product
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                          <div className="flex h-36 flex-col items-start justify-between p-0.5 md:h-44 md:p-1">
                            <PriceFormatter
                              amount={(product?.price as number) * itemCount}
                              className="text-lg font-bold"
                            />
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold"
                      variant="destructive"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>

                {/* Product View end */}

                <div className="lg:col-span-1">
                  <div className="hidden w-full rounded-lg border bg-white p-6 md:inline-block">
                    <h2 className="mb-4 text-xl font-semibold">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>

                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>

                        <PriceFormatter
                          amount={useCartStore?.getState().getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full cursor-pointer rounded-full font-semibold tracking-wide"
                        size="lg"
                      >
                        {loading ? "Processing" : "Proceed to Checkout"}
                      </Button>
                      <Link
                        href="/"
                        className="text-darkColor border-darkColor/50 hover:bg-darkColor/5 hover:border-darkColor hoverEffect flex items-center justify-center rounded-full border py-2 text-center text-sm hover:underline"
                      >
                        <Image
                          src={paypalLogo}
                          className="w-20"
                          alt="paypalLogo"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Order summary mobile view */}
                <div className="fixed bottom-0 left-0 w-full bg-white pt-2 md:hidden">
                  <div className="mx-4 rounded-lg border bg-white p-4">
                    <h2 className="mb-2 text-lg font-semibold">
                      Order Summary
                    </h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>

                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>

                        <PriceFormatter
                          amount={useCartStore?.getState().getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full rounded-full font-semibold tracking-wide"
                        size="lg"
                      >
                        {loading ? "Processing" : "Proceed to Checkout"}
                      </Button>
                      <Link
                        href="/"
                        className="text-darkColor border-darkColor/50 hover:bg-darkColor/5 hover:border-darkColor hoverEffect flex items-center justify-center rounded-full border py-2 text-center text-sm hover:underline"
                      >
                        <Image
                          src={paypalLogo}
                          className="w-20"
                          alt="paypalLogo"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
