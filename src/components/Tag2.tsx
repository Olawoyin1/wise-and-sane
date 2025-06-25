import React from "react";
// import TagButton from "./TagButton";
import SButton from "./SmallB";
import BButton from "./BigButton";

interface TagItem {
  label: string;
  link: string;
  bgColor: string;
}



const tags: TagItem[] = [
  { label: "Solution", link: "/", bgColor: "#B8F2E6" },
  { label: "Asia", link: "/", bgColor: "#FFB7D5" },
  { label: "Arabia", link: "/", bgColor: "#A1E3FF" },
  { label: "Society", link: "/", bgColor: "#D5AAFF" },
  { label: "Europe", link: "/", bgColor: "#FEBDD0" },
  { label: "Action", link: "/", bgColor: "#A1E3FF" },
  { label: "Americas", link: "/", bgColor: "#FFC1A1" },
  { label: "Behaviour", link: "/", bgColor: "#FFD682" },
  { label: "Inspiration", link: "/", bgColor: "#FFD682" },
];

const mTags: TagItem[] = [
  { label: "Article", link: "/", bgColor: "#B8F2E6" },
  { label: "Video", link: "/", bgColor: "#D5AAFF" },
  { label: "Wisdom", link: "/", bgColor: "#FFC1A1" },
];

const TagCloud: React.FC = () => {
  return (
    <div className="relative ml-9 md:ml-0">
      {/* Rotated Header */}
      <h3 className="absolute left-[-80px] sm:left-[-90px] top-1/2 transform rotate-270 text-sm md:text-xl font-bold text-center writing-vertical text-[#1E1B1B] font-playfair">
        Tag Cloud
        <span className="text-pink-500 inline-block ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            width="14"
            height="14"
            fill="currentColor"
          >
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
          </svg>
        </span>
      </h3>

      {/* Main Tag Container */}
      <div
        className="relative w-full bg-[#FFF0D3] rounded-[15px]   justify-center gap-0  shadow-md p-4 md:h-[270px] h-auto"
        id="tag-box"
      >
        <div className="flex flex-wrap space-x-3 items-center w-full">
          {mTags.map((tag) => (
            <BButton
              key={tag.label}
              label={tag.label}
              to={tag.link}
              bgColor={tag.bgColor}
            />
          ))}
        </div>
        <hr className="mt-1 text-gray-500" />
        <div className="flex flex-wrap space-x-3 items-center w-full">
          {tags.map((tag) => (
            <SButton
              key={tag.label}
              label={tag.label}
              to={tag.link}
              bgColor={tag.bgColor}
            />
          ))}
        </div>
      </div>

      {/* Decorative Span below bottom-right, shifted left */}
      <span
        className="absolute border border-gray-700 rounded-[15px] opacity-50 z-[-1] 
    bottom-[-14px] right-4  
    w-full h-full"
      />
    </div>
  );
};

export default TagCloud;
