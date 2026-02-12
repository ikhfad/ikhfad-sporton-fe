import Image from "next/image";
import Link from "next/link";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-dark-alternative text-white">
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:justify-around gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-5">
            <Image
              src="/images/logo-footer.svg"
              alt="logo sporton footer"
              width={160}
              height={38}
              className="w-36 md:w-40 h-auto"
            />
            <p className="mt-6 text-sm md:text-base leading-relaxed text-gray-300">
              Engineered for endurance and designed for speed. Experience gear
              that moves as fast as you do.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-sm md:text-base">Company</h3>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Categories
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
              >
                About Us
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-sm md:text-base">Social</h3>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Facebook
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
              >
                TikTok
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
              >
                YouTube
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/15">
        <div className="container mx-auto px-4 sm:px-6 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs md:text-sm text-gray-400">
              SportsOn © {currentYear} All Rights Reserved.
            </div>

            <div className="flex gap-6 text-xs md:text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
