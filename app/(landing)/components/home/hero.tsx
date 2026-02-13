import Image from "next/image";
import { FiFastForward } from "react-icons/fi";
import Button from "../ui/button";

const HeroSection = () => {
  return (
    <section id="hero-section" className="relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 min-h-screen flex items-center pt-20 md:pt-24 relative container">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10 w-full py-8 md:py-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
            <Image
              src="/images/img-basketball.png"
              width={400}
              height={400}
              alt=""
              className="grayscale opacity-40 xl:opacity-30 hidden lg:block absolute left-0 lg:-left-4 xl:-left-8 top-0 lg:-top-8 xl:-top-12 w-36 md:w-44 lg:w-75 xl:w-105 h-auto rounded-full object-cover z-[-1]"
              aria-hidden="true"
              loading="eager"
            />
            <div className="text-primary italic text-sm md:text-base lg:text-lg mb-2 md:mb-4">
              Friday Sale, 50%
            </div>
            <h1 className="font-extrabold italic leading-tight bg-linear-to-b from-black to-[#979797] bg-clip-text text-transparent text-[1.75rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[5.5rem] wrap-break-word">
              WEAR YOUR TOP-QUALITY SPORTSWEAR
            </h1>
            <p className="mt-4 md:mt-6 lg:mt-8 leading-relaxed text-sm md:text-base lg:text-lg text-gray-600">
              Engineered for endurance and designed for speed. Experience gear
              that moves as fast as you do. Premium fabrics. Unmatched comfort.
              Limitless motion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 lg:mt-10">
              <Button
                className="w-full sm:w-auto min-h-11"
                variant="primary"
                size="normal"
              >
                Explore More <FiFastForward />
              </Button>
              <Button
                className="w-full sm:w-auto min-h-11"
                variant="ghost"
                size="normal"
              >
                Watch Video
                <Image
                  src="/images/icon-play-video.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-5 h-5 md:w-6 md:h-6"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2 hidden lg:flex items-center justify-center">
            <Image
              src="/images/img-hero.png"
              width={500}
              height={700}
              alt="SportOn sportswear collection"
              className="w-full max-w-md xl:max-w-lg 2xl:max-w-xl h-auto object-contain"
              fetchPriority="high"
              loading="eager"
            />
          </div>
        </div>
      </div>
      <Image
        src="/images/img-ornament-hero.svg"
        width={300}
        height={300}
        alt=""
        className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 hidden lg:block w-64 xl:w-80 h-auto z-[-1]"
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroSection;
