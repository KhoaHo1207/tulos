import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ListOrdered } from "lucide-react";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

export default async function Header() {
  const user = await currentUser();

  return (
    <header className="border-b border-b-gray-400 py-5">
      <Container className="text-lightColor flex items-center justify-between gap-7">
        <HeaderMenu />
        <MobileMenu />
        <div className="flex w-auto items-center justify-center gap-2.5 md:w-1/3">
          <Logo>Tulos</Logo>
        </div>
        <div className="flex w-auto items-center justify-center gap-5 md:w-1/3">
          <SearchBar />
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <Link href={"/orders"} className="group relative">
                <ListOrdered className="group-hover:text-darkColor hoverEffect size-5" />
                <span className="bg-darkColor absolute -top-2 -right-2 flex size-3.5 items-center justify-center rounded-full text-xs font-semibold text-white">
                  0
                </span>
              </Link>
              <UserButton />
            </SignedIn>
            {!user && (
              <SignInButton mode="modal">
                <button className="hover:text-darkColor hoverEffect text-sm font-semibold">
                  Login
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
}
