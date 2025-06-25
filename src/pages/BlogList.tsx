import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogPosts } from "../api/Blog";
// import SingleCard from "./SingleCard";
// import FancyLinkButton from "./Button";
// import SkeletonCard from "./SkeletonCard";
import { AnimatePresence, motion } from "framer-motion";
import { CardItem } from "../data/Types";
import SingleCard from "../components/SingleCard";
// import FancyLinkButton from "../components/Button";
import SkeletonCard from "../components/SkeletonCard";
import NormalButton from "../components/NormalButton";

const ITEMS_PER_PAGE = 6;

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery<CardItem[]>({
    queryKey: ["blogPosts"],
    queryFn: fetchBlogPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  return (
    <>
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-20 place-items-center">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      ) : isError ? (
        <div className="text-center py-10 text-red-500">
          Failed to load blog posts.
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-8 md:px-12">
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

            {/* Pagination */}
            {posts.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center items-center mt-10 space-x-3">
                {currentPage > 1 && (
                  <button
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className=""
                  >
                    <NormalButton label="Prev" bgColor="#FFE6B4" />
                    
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
  <button
    onClick={() => setCurrentPage((p) => p + 1)}
    className=""
  >
    <NormalButton label="Next" bgColor="#FFE6B4" />
    
  </button>
)}

              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default BlogList;
