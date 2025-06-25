import { useEffect, useState } from "react";
import axios from "axios";
import SingleCard from "./SingleCard";
import FancyLinkButton from "./Button";
import SkeletonCard from "./SkeletonCard"; // 👈 import
import { AnimatePresence, motion } from "framer-motion";

// Category-to-color mapping
const CATEGORY_COLORS: Record<string, string> = {
  Inspiration: "#D5AAFF",
  Qoute: "#FAD9E6",
  Survey: "#FFD682",
  Article: "#E8D4C3",
  Video: "#B8F2E6",
};

interface CardItem {
  id: number;
  title: string;
  slug: string;
  author: string;
  body: string;
  description: string;
  category: string;
  tag: string;
  subTag?: string;
  subTagC?: string;
  image: string;
  video?: string;
  contentImages?: string[];
  buttonLabel: string;
  buttonLink: string;
  buttonBgColor: string;
  created_at: string;
}

const ITEMS_PER_PAGE = 6;

const Card = () => {
  const [posts, setPosts] = useState<CardItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://sosoiloji.onrender.com/api/posts/");
        const data = res.data;

        const cleanText = (html: string): string => {
          const tempEl = document.createElement("div");
          tempEl.innerHTML = html;
          return tempEl.textContent?.replace(/\s+/g, " ").trim() || "";
        };

        const transformed: CardItem[] = data.map((post: any) => {
          const color = CATEGORY_COLORS[post.category] || "#FFE6B4";
          const plainText = cleanText(post.body).slice(0, 180) + "...";

          return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            author: post.author,
            body: post.body,
            description: plainText,
            category: post.category,
            tag: post.tag,
            subTag: post.subtag,
            subTagC: post.subtag,
            image: post.image || "",
            video: post.video,
            contentImages: post.contentImages || [],
            buttonLabel: "Read More",
            buttonLink: `/post/${post.slug}`,
            buttonBgColor: color,
            created_at: post.created_at,
          };
        });

        setPosts(transformed);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-20 place-items-center">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-20 md:space-y-0 place-items-center">
            <AnimatePresence mode="wait">
              {paginatedPosts.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SingleCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination - show only if more than 1 page */}
          {posts.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center items-center mt-10 space-x-3">
              {currentPage > 1 && (
                <button onClick={() => setCurrentPage((prev) => prev - 1)}>
                  <FancyLinkButton to="/" label="Prev" bgColor="#FFE6B4" />
                </button>
              )}
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-1 cursor-pointer rounded ${
                      currentPage === page
                        ? "bg-[#FFE6B4] text-black"
                        : "hover:bg-gray-300 bg-[#EEEEEE]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              {currentPage < totalPages && (
                <button onClick={() => setCurrentPage((prev) => prev + 1)}>
                  <FancyLinkButton to="/" label="Next" bgColor="#FFE6B4" />
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Card;
