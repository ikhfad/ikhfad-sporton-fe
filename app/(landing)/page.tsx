import HeroSection from "./components/home/hero";
import CategorySection from "./components/home/categories";
import ProductSection from "./components/home/products";
import { getAllCategories } from "../services/category.service";
import { getAllProducts } from "../services/product.service";

export default async function Home() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);
  return (
    <main>
      <HeroSection />
      <CategorySection categories={categories} />
      <ProductSection products={products} />
    </main>
  );
}
