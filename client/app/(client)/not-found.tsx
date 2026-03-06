import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="flex h-full min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Logo>Tulos</Logo>

            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Looking for something?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;re sorry. The Web address you entered is not a functioning
              page on our site.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md shadow-xs">
              <Link
                href="/"
                className="bg-darkBlue/80 hover:bg-darkBlue focus:ring-amazonOrangeDark hoverEffect flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-semibold text-white focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
              >
                Go to Tulos&apos;s home page
              </Link>
              <Link
                href="/help"
                className="text-amazonBlue focus:ring-amazonBlue flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
              >
                Help
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need help? Visit the{" "}
              <Link
                href="/help"
                className="text-amazon-blue font-medium hover:text-blue-800"
              >
                Help section
              </Link>{" "}
              or{" "}
              <Link
                href="/contact"
                className="text-amazon-blue font-medium hover:text-blue-800"
              >
                contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
