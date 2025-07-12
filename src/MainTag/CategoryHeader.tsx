import React from "react";

interface CategoryHeaderProps {
  category: string;
  count: number;
  description?: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category, count, description }) => {
  return (
    <div className="mb-16 flex items-center flex-col  sm:flex-row text-center sm:text-start gap-7 sm:gap-10 ">
        <div className="shrink-0">

      <h1 className="text-3xl font-bold capitalize">{category}</h1>
      <p className="text-gray-600 mt-1 text-sm ">A collection of <strong> {count} {count === 1 ? "post" : "posts"}</strong></p>
        </div>
      <div>

      <p className="text-gray-700 border-0 sm:border-l sm:pl-9 pf font-light leading-relaxed">
        {description ??
          `Explore our curated posts on ${category.toLowerCase()}, where we dive into topics that matter to you. 
          Find insights, stories, and tips in our collection tailored for curious minds.`}
      </p>
        </div>
    </div>
  );
};

export default CategoryHeader;
