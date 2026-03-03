import CartIcon from "./CartIcon";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

export default function Header() {
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
          <div>
            <button className="hover:text-darkColor hoverEffect text-sm font-semibold">
              Login
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
