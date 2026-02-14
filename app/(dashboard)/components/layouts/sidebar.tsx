"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/services/auth.service";
import {
  FiBox,
  FiLayers,
  FiShoppingCart,
  FiCreditCard,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Products",
      icon: FiBox,
      link: "/admin/products",
    },
    {
      name: "Categories",
      icon: FiLayers,
      link: "/admin/categories",
    },
    {
      name: "Transactions",
      icon: FiShoppingCart,
      link: "/admin/transactions",
    },
    {
      name: "Bank Information",
      icon: FiCreditCard,
      link: "/admin/bank-info",
    },
  ];

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isMobileMenuOpen) {
      body.style.overflow = "hidden";
      root.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
      root.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
      root.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-40 lg:hidden flex items-center justify-between px-4">
        <Image
          src="/images/logo-admin.svg"
          alt="Logo Admin"
          width={150}
          height={24}
          className="h-6 w-auto"
          loading="eager"
        />
        <button
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white border-r border-gray-100 flex flex-col z-50 transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="py-6 px-6 border-b border-gray-200 flex items-center justify-between">
          <div className="min-w-0">
            <Image
              src="/images/logo-admin.svg"
              alt="Logo Admin"
              width={150}
              height={24}
              className="h-6 w-auto max-w-full"
              loading="eager"
            />
          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-6 p-4">
          {menuItems.map((item, index) => {
            const isActive = item.link === pathname;
            return (
              <Link
                href={item.link}
                key={index}
                className={`flex gap-3 items-center py-3 px-4 rounded-lg font-medium duration-300 ${
                  isActive ? "bg-primary/15 text-primary" : "hover:bg-gray-100"
                }`}
                onClick={closeMobileMenu}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleLogout}
          className="flex gap-3 font-medium py-3 px-4 mx-4 hover:bg-gray-100 duration-300 rounded-lg mt-auto mb-6 cursor-pointer"
        >
          <FiLogOut size={20} />
          <span>Log Out</span>
        </button>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-75 min-h-screen bg-white border-r border-gray-100 flex-col fixed left-0 top-0 z-30">
        <div className="py-8 px-14 border-b border-gray-200">
          <Image
            src="/images/logo-admin.svg"
            alt="Logo Admin"
            width={215}
            height={36}
            loading="eager"
          />
        </div>
        <div className="flex flex-col gap-2 mt-12 p-5">
          {menuItems.map((item, index) => {
            const isActive = item.link === pathname;
            return (
              <Link
                href={item.link}
                key={index}
                className={`flex gap-3 items-center py-3 px-4.5 rounded-lg font-medium duration-300 ${
                  isActive ? "bg-primary/15 text-primary" : "hover:bg-gray-100"
                }`}
              >
                <item.icon size={24} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleLogout}
          className="flex gap-3 font-medium py-3 px-4.5 mx-5 hover:bg-gray-100 duration-300 rounded-lg mt-auto mb-10 cursor-pointer"
        >
          <FiLogOut size={24} />
          <span>Log Out</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
