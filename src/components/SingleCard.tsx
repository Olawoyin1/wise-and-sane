import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import FancyLinkButton from "./Button";
import { CardItem } from "../data/Types"; // ✅ import shared type

const SingleCard = ({ item }: { item: CardItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const getFirstParagraph = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const p = doc.querySelector("p");
  return p ? p.outerHTML : "";
};

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center max-w-[500px] max-h-[590px] md:max-h-[590px]">
      {/* Image */}
      <div
        className="relative w-full h-[340px] md:h-[440px]"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={() => isMobile && setIsHovered((prev) => !prev)}
      >
        {/* Image Background */}
        <div
          className="w-full h-full bg-cover bg-center border border-gray-300 rounded-xl"
          style={{ backgroundImage: `url(${item.image})` }}
        />

        {/* Overlay Frame */}
        <motion.div
          animate={
            isHovered
              ? { x: 0, y: 0 }
              : isMobile
              ? { x: 0, y: 0 }
              : { x: -20, y: 20 }
          }
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute top-0 left-0 w-full h-full border border-black rounded-xl cursor-pointer"
        >
          <Link
            to={`/post/${item.slug}`}
            className="absolute top-0 left-0 w-full h-full"
          >
            <div
              className={`
                absolute
                ${
                  item.subTag 
                    ? "top-21"
                    : item.category === "Article"
                    ? "top-17"
                    : "top-20"
                }
                left-0 
                -translate-x-[50%]
                flex
                rotate-90
                gap-4
                items-center 
                justify-items-center 
                pointer-events-auto
              `}
            >
              {/* Rotated Tag */}
              <div className="w-max">
                <Link
                  to={`/tag/${item.category}`}
                  className="text-sm sm:text-[16px] border z-20 border-black/90 rounded-full 
                  px-4 py-[3px] font-bold no-underline 
                  flex justify-center items-center transform rotate-180 origin-center"
                  style={{ backgroundColor: item.buttonBgColor }}
                >
                  {item.category}
                </Link>
              </div>

              {/* Hover Subtag (only for Article & Inspiration) */}
              {item.subTag && (
                <div className="relative group">
                  <Link
                    to="/"
                    className="w-8 h-8 sm:h-9 sm:w-9 border border-black/90 rounded-full 
                    flex justify-center items-center rotate-270 text-xs font-bold md:text-sm"
                    style={{ backgroundColor: item.buttonBgColor }}
                  >
                    {item.subTag?.charAt(0)}
                  </Link>

                  <div
                    className={`
                      absolute
                      ${
                        item.category === "Inspiration"
                          ? "-top-19 -left-10"
                          : "-top-15 -left-7"
                      }
                      ml-2 
                      bg-white border border-gray-200 text-sm font-semibold p-1 px-3 rounded-md rotate-270 
                      whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30
                    `}
                  >
                    {item.category === "Inspiration"
                      ? item.subTagC
                      : item.subTag}
                  </div>
                </div>
              )}
            </div>
          </Link>
        </motion.div> 
      </div>

      {/* Text */}
      <div className="mt-4  md:mt-10">
        <div className="mb-5">
          <h1 className="text-xl sc-header line-clamp-2 font-extrabold mb-3 leading-tight">
            {item.title}
          </h1>


          <p
  className="text-gray-700 pf line-clamp-3 leading-loose text-xs mb-3"
  dangerouslySetInnerHTML={{ __html: getFirstParagraph(item.body) }}
/>


          <div className="flex items-center justify-between">
            <FancyLinkButton
              label={item.buttonLabel}
              to={`/post/${item.slug}`}
              bgColor={item.buttonBgColor}
            />

            {/* Author Link */}
            <Link
              to={`/author/${encodeURIComponent(item.author)}`}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden bg-black/30 text-white flex justify-center items-center rounded-full">
                <img
                  src="https://th.bing.com/th/id/OIP.ItvA9eX1ZIYT8NHePqeuCgHaHa?w=210&h=210"
                  alt={item.author}
                  className="object-cover"
                />
              </div>
              <p className="font-bold">{item.author}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
