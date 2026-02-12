import Image from "next/image";
import { FiFastForward } from "react-icons/fi";
import Button from "../ui/button";

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="container mx-auto px-4 sm:px-6 min-h-screen flex items-center pt-16 md:pt-20"
    >
      <div className="relative w-full py-8 md:py-12 lg:py-16">
        {/* Basketball Background Image */}
        <Image
          src="/images/img-basketball.png"
          width={200}
          height={200}
          alt="image sporton"
          className="grayscale absolute left-0 -top-4 md:-top-20 w-30 md:w-50 lg:w-75 h-auto z-0"
          loading="eager"
        />

        <div className="relative ml-0 md:ml-10 lg:ml-40 w-full z-10">
          <div className="text-primary italic text-sm md:text-base lg:text-lg mb-2 md:mb-4">
            Friday Sale, 50%
          </div>
          <h1 className="font-extrabold italic leading-tight bg-linear-to-b from-black to-[#979797] bg-clip-text text-transparent text-[2rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6rem]">
            WEAR YOUR <br className="hidden sm:block" />
            TOP-QUALITY <br className="hidden sm:block" />
            SPORTSWEAR
          </h1>
          <p className="mt-4 md:mt-6 lg:mt-10 leading-relaxed text-sm md:text-base lg:text-lg max-w-full md:max-w-lg lg:max-w-xl text-gray-600">
            Engineered for endurance and designed for speed. Experience gear
            that moves as fast as you do. Premium fabrics. Unmatched comfort.
            Limitless motion.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-5 mt-6 md:mt-10 lg:mt-14">
            <Button
              className="w-full sm:w-auto"
              variant="primary"
              size="normal"
            >
              Explore More <FiFastForward />
            </Button>
            <Button variant="ghost" className="w-full sm:w-auto" size="normal">
              Watch Video{" "}
              <Image
                src="/images/icon-play-video.svg"
                alt="icon playvideo"
                width={24}
                height={24}
                className="w-5 h-5 md:w-7.25 md:h-7.25"
              />{" "}
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <Image
          src="/images/img-hero.png"
          width={500}
          height={700}
          alt="image sporton hero"
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block w-75 lg:w-125 xl:w-150 2xl:w-175 h-auto z-0"
          fetchPriority="high"
          loading="eager"
        />

        {/* Mobile Hero Image */}
        <Image
          src="/images/img-hero.png"
          width={400}
          height={500}
          alt="image sporton hero"
          className="absolute -right-4 top-1/3 -translate-y-1/2 md:hidden w-62.5 h-auto opacity-35 z-0"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      {/* Decorative Ornament */}
      <Image
        src="/images/img-ornament-hero.svg"
        width={300}
        height={300}
        alt="image sporton ornament"
        className="absolute -right-10 md:-right-20 lg:-right-40 top-1/2 -translate-y-1/2 hidden lg:block w-50 md:w-75 h-auto z-[-1]"
      />
    </section>
  );
};

export default HeroSection;
