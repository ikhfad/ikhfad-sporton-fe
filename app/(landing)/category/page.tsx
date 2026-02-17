import { getAllCategories } from "@/app/services/category.service";
import CategoryCard from "../components/ui/category-card";
import PageHeader from "../components/ui/page-header";

const CategoriesPage = async () => {
  const categories = await getAllCategories();

  return (
    <main>
      <div className="container min-h-screen mx-auto sm:px-6 pt-30 xl:pt-35 pb-16 md:pb-20 lg:pb-16">
        <PageHeader
          title="Browse Categories"
          subtitle="Explore our wide range of sportswear categories designed for every athlete"
        />

        {/* Categories Grid - Responsive: 2 cols mobile, 3 cols tablet, 4 cols small laptop, 6 cols desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoriesPage;
