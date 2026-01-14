import HeroSection from "./components/home/hero";
import CategorySection from "./components/home/categories";
import ProductSection from "./components/home/products";
import { getAllCategories } from "../services/category.service";

export default async function Home() {
  const categories = await getAllCategories();
  return (
    <main>
      <HeroSection />
      <CategorySection categories={categories} />
      <ProductSection />
    </main>
  );
}
