import { SquareStack } from "lucide-react";
import CategoryCard from "../../molecules/category-card";
import Category from "../../../entities/products/Category";
import { useNavigate } from "react-router-dom";

interface CategorySectionProps {
  categories: Category[];
  categoryId: string;
  categoryName?: string;
}

export default function CategorySection({ categories, categoryId, categoryName }: CategorySectionProps) {
  // categories without parent are primary categories
  const primaryCategories = categories.filter((category) => category.parent === null);

  // categories with parent are secondary categories
  const secondaryCategories = categories.filter((category_) => category_.parent?.id === categoryId);

  const navigate = useNavigate();

  return (
    <section className="caregories-container">
      <div>
        <label>
          Categories <SquareStack className="icon" />
        </label>
        {!categoryId ? (
          <p>Click to filter by category</p>
        ) : (
          <p className="pointer" onClick={() => navigate("/")}>
            Click to reset filters
          </p>
        )}
      </div>
      <div className="categories-grid">
        {primaryCategories.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {categoryId && secondaryCategories.length > 0 && (
        <>
          <div>
            <label>Similar categories</label>
            <p>{categoryName}</p>
          </div>
          <div className="categories-grid">
            {secondaryCategories.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
