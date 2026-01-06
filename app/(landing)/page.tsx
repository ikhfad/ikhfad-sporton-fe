import HeroSection from "./components/home/hero";
import CategorySection from "./components/home/categories";
import ProductSection from "./components/home/products";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <ProductSection />
    </main>
  );
}
