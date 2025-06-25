import { CardItem } from "../data/Types"; // 👈 or wherever you store types

interface BlogHeroProps {
  blog: CardItem;
  height?: "small" | "medium" | "large";
}

const BlogHero = ({ blog, height = "medium" }: BlogHeroProps) => {
  const heightClass = {
    small: "sm:h-[300px] h-[250px]",
    medium: "sm:h-[440px] h-[250px]",
    large: "sm:h-[500px] h-[250px]",
  }[height];

  return (
    <div className="relative shrink-0">
      <img
        src={blog.image}
        alt={blog.title}
        className={`relative w-full bg-[#FFF0D3] rounded-[15px] object-cover justify-center gap-0 shadow-md ${heightClass}`}
        id="tag-box"
      />
      <span className="absolute border border-gray-700 rounded-[15px] opacity-50 z-[-1] bottom-[-7px] right-2 sm:bottom-[-14px] sm:right-4 w-full h-full" />
    </div>
  );
};

export default BlogHero;
