import Link from "next/link";
import React from "react";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Container from "./Container";
import { getAllCategories, getMyOrders } from "@/sanity/helpers/queries";
import HeaderMenu from "@/components/HeaderMenu";
import Logo from "@/components/Logo";
import { ListOrdered } from "lucide-react";
import CartIcon from "@/components/CartIcon";
import MobileMenu from "@/components/MobileMenu";
import SearchBar from "@/components/SearchBar";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }
  const categories = await getAllCategories(3);

  return (
    <header className="sticky top-0 z-50 border-b border-b-gray-200 bg-white py-5">
      <Container className="text-lightColor flex items-center justify-between gap-7">
        <HeaderMenu categories={categories} />
        <div className="flex w-auto items-center justify-center gap-2.5 md:w-1/3">
          <MobileMenu categories={categories} />
          <Logo>Tulos</Logo>
        </div>
        <div className="flex w-auto items-center justify-end gap-5 md:w-1/3">
          <SearchBar />
          <CartIcon />
          <SignedIn>
            <Link href={"/orders"} className="group relative">
              <ListOrdered className="group-hover:text-darkColor hoverEffect" />
              <span className="bg-darkColor absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold text-white">
                {orders?.length ? orders?.length : 0}
              </span>
            </Link>
          </SignedIn>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {!user && (
              <Link
                href="/signin"
                className="hover:text-darkColor hoverEffect text-sm font-semibold"
              >
                Login
              </Link>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
