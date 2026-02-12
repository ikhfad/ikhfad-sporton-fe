"use client";

import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import CartPopup from "../ui/cart-popup";
import { useEffect, useState } from "react";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { usePathname } from "next/navigation";

const Header = () => {
  const { items } = useCartStore();
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#category-section", label: "Category" },
    { href: "#products-section", label: "Explore Product" },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleCart = () => setIsCartPopupOpen((prev) => !prev);

  useEffect(() => {
    if (isCartPopupOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartPopupOpen, isMobileMenuOpen]);

  return (
    <>
      {/* HEADER - Z-INDEX 40 */}
      <header className="fixed w-full z-40 top-0 left-0 right-0 backdrop-blur-xl bg-white/90 border-b border-gray-100 transition-all">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Left: Logo */}
            <div className="justify-self-start">
              <Link
                href="/"
                className="shrink-0 block"
                onClick={closeMobileMenu}
              >
                <Image
                  src="/images/logo.svg"
                  alt="sporton logo"
                  width={100}
                  height={24}
                  loading="eager"
                  fetchPriority="high"
                  className="h-6 w-auto sm:h-8"
                />
              </Link>
            </div>

            {/* Middle: Desktop Nav */}
            <nav className="hidden lg:flex gap-6 xl:gap-10 font-medium text-sm xl:text-base justify-center">
              {navLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.label}
                  className="relative hover:text-primary transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                  {(pathname === link.href ||
                    (link.href === "/" && pathname === "/")) && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Right: Desktop Actions */}
            <div className="hidden lg:flex gap-6 xl:gap-10 items-center justify-self-end">
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Search"
              >
                <FiSearch size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={toggleCart}
                aria-label="Shopping Cart"
              >
                <FiShoppingBag size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                {items.length > 0 && (
                  <div className="bg-primary rounded-full w-4 h-4 sm:w-3.5 sm:h-3.5 absolute -top-1 -right-1 text-[10px] text-white flex items-center justify-center min-w-3.5 min-h-3.5">
                    {items.length}
                  </div>
                )}
              </button>
            </div>

            {/* Mobile: Cart & Menu Buttons */}
            <div className="flex lg:hidden items-center gap-2 justify-self-end">
              <button
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleCart}
                aria-label="Shopping Cart"
              >
                <FiShoppingBag size={20} />
                {items.length > 0 && (
                  <div className="bg-primary rounded-full w-4 h-4 absolute -top-1 -right-1 text-[10px] text-white flex items-center justify-center min-w-3.5 min-h-3.5">
                    {items.length}
                  </div>
                )}
              </button>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY - Z-INDEX 50 */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* MOBILE MENU DRAWER - Z-INDEX 60 */}
      <nav
        className={`
          fixed inset-y-0 left-0 w-full md:w-4/5 max-w-sm bg-white shadow-2xl z-60 transform transition-transform duration-300 ease-in-out lg:hidden
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Mobile navigation"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <Image
            src="/images/logo.svg"
            alt="sporton logo"
            width={100}
            height={24}
          />
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="flex flex-col p-4 gap-2 overflow-y-auto h-full pb-20">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={`px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-4 border-gray-100" />
          <button
            className="px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3 text-left"
            onClick={closeMobileMenu}
          >
            <FiSearch size={20} />
            <span>Search</span>
          </button>
        </div>
      </nav>

      {/* CART POPUP & BACKDROP - Z-INDEX 70 */}
      {isCartPopupOpen && (
        <div className="fixed inset-0 pointer-events-none z-70">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 z-0"
            onClick={() => setIsCartPopupOpen(false)}
          />

          {/*
            MOBILE CART WRAPPER
            - lg:hidden: Only visible on mobile.
            - absolute right-0 top-0: Aligns to screen edge.
            - w-full max-w-[360px]: Ensures it fits the screen.
          */}
          <div className="lg:hidden pointer-events-auto absolute right-0 top-0 w-full max-w-90">
            <CartPopup onClose={() => setIsCartPopupOpen(false)} />
          </div>

          {/*
            DESKTOP CART WRAPPER
            - hidden lg:flex: Only visible on desktop.
            - container mx-auto: Matches header width.
            - absolute right-0: Aligns to container edge.
          */}
          <div className="hidden lg:flex container mx-auto px-4 sm:px-6 relative h-full">
            <div className="pointer-events-auto absolute right-0 top-0">
              <CartPopup onClose={() => setIsCartPopupOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
