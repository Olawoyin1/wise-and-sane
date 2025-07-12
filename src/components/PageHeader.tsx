import React from "react";

interface PageHeaderProps {
  title: string;          // e.g., category name, author name, tag name
  count: number;          // number of posts
  type?: "category" | "author" | "tag" | "custom"; // determines display format
  description?: string;   // optional override
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, count, type = "category", description }) => {
  const getSubheading = () => {
    switch (type) {
      case "author":
        return `Author of ${count} ${count === 1 ? "post" : "posts"}`;
      case "tag":
        return `Tagged in ${count} ${count === 1 ? "post" : "posts"}`;
      case "custom":
        return description || "";
      default:
        return `A collection of ${count} ${count === 1 ? "post" : "posts"}`;
    }
  };

  const getDefaultDescription = () => {
    return (
      description ??
      `Explore our curated posts on ${title.toLowerCase()}, where we dive into topics that matter to you. 
      Find insights, stories, and tips in our collection tailored for curious minds.`
    );
  };

  return (
    <div className="mb-16  max-w-3xl mx-auto flex items-center flex-col sm:flex-row text-center sm:text-start gap-7 sm:gap-10">
        <div className="flex gap-3 items-center">
          <div className="w-full flex justify-center md:justify-start">
              <div className="relative w-14 h-14">
                <img
                  src="../../Images/eleven.webp"
                  alt="Author"
                  className="w-full h-full object-cover rounded-full"
                />
                {/* Decorative circle */}
                <span className="absolute w-full h-full rounded-full bottom-[-2px] left-[-4px] border border-gray-400 z-[1]" />
              </div>
            </div>
      <div className="shrink-0">
          <h1 className="text-3xl font-bold capitalize">{title}</h1>
          <p className="text-gray-600 mt-1 text-sm">
            <strong>{getSubheading()}</strong>
          </p>
        </div>
      </div>
      <div>
        <p className="text-gray-900 leading-7 border-0 sm:border-l pf text-sm sm:pl-9 font-light ">
          {getDefaultDescription()}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
