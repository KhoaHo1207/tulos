import Link from "next/link";
import Logo from "@/components/Logo";
import FooterTop from "@/components/FooterTop";
import SocialMedia from "@/components/SocialMedia";
import { categoriesData, quickLinksData } from "@/constants";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section with contact info */}
        <FooterTop />

        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo>Tulos</Logo>
            <p className="text-sm text-gray-600">
              Discover curated furniture collections at Tulos, blending style
              and comfort to elevate your living spaces.
            </p>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-darkColor hover:text-darkColor"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hoverEffect text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Categories</h3>
            <ul className="space-y-3">
              {categoriesData.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category${item?.href}`}
                    className="hoverEffect text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Newsletter</h3>
            <p className="mb-4 text-sm text-gray-600">
              Subscribe to our newsletter to receive updates and exclusive
              offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-200 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="border-t py-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Tulos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
