import Image from "next/image";
import Button from "../components/ui/button";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiYoutube,
} from "react-icons/fi";
import { AiFillTikTok } from "react-icons/ai";

const AboutPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary-light">
        <div className="mx-auto px-4 sm:px-6 pt-30 md:pt-35 py-16 md:py-20 lg:min-h-screen flex items-center relative container">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="w-full">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 md:mb-6">
                About <span className="text-primary">SportOn</span>
              </h1>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
                Engineered for endurance and designed for speed. Since our
                founding, we have been committed to creating premium sportswear
                that empowers athletes to push their limits and achieve their
                goals.
              </p>
              <Button
                variant="primary"
                size="normal"
                className="w-full md:w-fit"
              >
                Explore Our Products
              </Button>
            </div>
            <div className="hidden w-full lg:flex justify-end">
              <Image
                src="/images/img-hero.png"
                alt="SportOn sportswear"
                width={600}
                height={700}
                className="lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 sm:px-6 py-14 md:py-18 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold text-2xl md:text-3xl mb-6 md:mb-8">
            Our Story
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
            SportOn was born from a simple belief: every athlete deserves access
            to high-quality sportswear that does not compromise on performance
            or comfort. What started as a small passion project has grown into a
            trusted brand serving athletes across multiple sports disciplines.
          </p>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            From basketball courts to running tracks, from swimming pools to
            tennis courts, our gear has been tested and trusted by athletes who
            demand the best. We combine cutting-edge fabric technology with
            thoughtful design to create sportswear that moves as fast as you do.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-dark-alternative text-white">
        <div className="container mx-auto px-4 sm:px-6 py-14 md:py-18 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Mission */}
            <div className="text-center md:text-left">
              <h3 className="font-bold text-xl md:text-2xl mb-4 text-primary">
                Our Mission
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                To provide athletes with premium, high-performance sportswear
                that enhances their game and supports their journey to
                excellence. We believe that the right gear can make the
                difference between good and great.
              </p>
            </div>
            {/* Vision */}
            <div className="text-center md:text-left">
              <h3 className="font-bold text-xl md:text-2xl mb-4 text-primary">
                Our Vision
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                To become the leading sportswear brand that athletes trust for
                quality, innovation, and performance. We envision a world where
                every athlete, regardless of level, has access to gear that
                helps them perform at their best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 sm:px-6 py-14 md:py-18 lg:py-20">
        <h2 className="font-bold text-2xl md:text-3xl text-center mb-10 md:mb-12">
          Why Choose <span className="text-primary">SportOn</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Feature 1 */}
          <div className="text-center p-6 rounded-xl bg-primary-light">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-base mb-2">Premium Quality</h4>
            <p className="text-sm text-gray-600">
              Crafted with the finest materials for durability and comfort
            </p>
          </div>
          {/* Feature 2 */}
          <div className="text-center p-6 rounded-xl bg-primary-light">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-base mb-2">High Performance</h4>
            <p className="text-sm text-gray-600">
              Engineered for speed, endurance, and maximum athletic performance
            </p>
          </div>
          {/* Feature 3 */}
          <div className="text-center p-6 rounded-xl bg-primary-light">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-base mb-2">Ultimate Comfort</h4>
            <p className="text-sm text-gray-600">
              Designed with breathable fabrics for all-day comfort
            </p>
          </div>
          {/* Feature 4 */}
          <div className="text-center p-6 rounded-xl bg-primary-light">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-base mb-2">For Every Athlete</h4>
            <p className="text-sm text-gray-600">
              Diverse range for all sports: basketball, running, tennis, and
              more
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 py-14 md:py-18 lg:py-20">
          <h2 className="font-bold text-2xl md:text-3xl text-center mb-10 md:mb-12">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Email */}
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-base mb-2">Email Us</h4>
              <a
                href="mailto:#"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                info@sporton.com
              </a>
            </div>
            {/* Phone */}
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPhone className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-base mb-2">Call Us</h4>
              <a
                href="tel:+#"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                +62 812 3456 7890
              </a>
            </div>
            {/* Address */}
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-base mb-2">Visit Us</h4>
              <p className="text-sm text-gray-600">Jakarta, Indonesia</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center mt-10 md:mt-12">
            <p className="text-sm text-gray-600 mb-4">
              Follow us on social media
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <AiFillTikTok className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
