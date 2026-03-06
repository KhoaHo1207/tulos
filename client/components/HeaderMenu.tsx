"use client";
import { CATEGORIES_QUERYResult, Category } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenu = ({ categories }: { categories: CATEGORIES_QUERYResult }) => {
  const pathname = usePathname();

  return (
    <div className="text-lightColor hidden w-1/3 items-center gap-5 text-sm font-semibold capitalize md:inline-flex">
      <Link
        href={"/"}
        className={`hover:text-darkColor hoverEffect group relative ${pathname === "/" && "text-darkColor"}`}
      >
        Home
        <span
          className={`bg-darkColor absolute -bottom-0.5 left-1/2 h-0.5 w-0 transition-all duration-300 group-hover:left-0 group-hover:w-1/2 ${
            pathname === "/" && "w-1/2"
          }`}
        />
        <span
          className={`bg-darkColor absolute right-1/2 -bottom-0.5 h-0.5 w-0 transition-all duration-300 group-hover:right-0 group-hover:w-1/2 ${
            pathname === "/" && "w-1/2"
          }`}
        />
      </Link>
      {categories?.map((category: Category) => (
        <Link
          key={category?._id}
          href={`/category/${category?.slug?.current}`}
          className={`hover:text-darkColor hoverEffect group relative ${pathname === `/category/${category?.slug?.current}` && "text-darkColor"}`}
        >
          {category?.title}
          <span
            className={`bg-darkColor absolute -bottom-0.5 left-1/2 h-0.5 w-0 transition-all duration-300 group-hover:left-0 group-hover:w-1/2 ${
              pathname === `/category/${category?.slug?.current}` && "w-1/2"
            }`}
          />
          <span
            className={`bg-darkColor absolute right-1/2 -bottom-0.5 h-0.5 w-0 transition-all duration-300 group-hover:right-0 group-hover:w-1/2 ${
              pathname === `/category/${category?.slug?.current}` && "w-1/2"
            }`}
          />
        </Link>
      ))}
      <Link
        href={"/shop"}
        className={`hover:text-darkColor hoverEffect group relative ${pathname === "/" && "text-darkColor"}`}
      >
        Shop
        <span
          className={`bg-darkColor absolute -bottom-0.5 left-1/2 h-0.5 w-0 transition-all duration-300 group-hover:left-0 group-hover:w-1/2 ${
            pathname === "/shop" && "w-1/2"
          }`}
        />
        <span
          className={`bg-darkColor absolute right-1/2 -bottom-0.5 h-0.5 w-0 transition-all duration-300 group-hover:right-0 group-hover:w-1/2 ${
            pathname === "/shop" && "w-1/2"
          }`}
        />
      </Link>
    </div>
  );
};

export default HeaderMenu;
