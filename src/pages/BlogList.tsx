import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogPosts } from "../api/Blog";
import { AnimatePresence, motion } from "framer-motion";
import { CardItem } from "../data/Types";
import SingleCard from "../components/SingleCard";
import SkeletonCard from "../components/SkeletonCard";
import NormalButton from "../components/NormalButton";

const ITEMS_PER_PAGE = 6;

const BlogList = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentParam = searchParams.get("page");
  const initialPage = parseInt(currentParam || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // If no page param, force page=1 in the URL
useEffect(() => {
  const pageParam = searchParams.get("page");

  if (location.pathname === "/") {
    if (!pageParam || isNaN(Number(pageParam))) {
      setCurrentPage(1);
      // Don't set search param for page 1
      setSearchParams({});
    } else {
      setCurrentPage(Number(pageParam));
    }
  }
}, [location.pathname, searchParams, setSearchParams]);

const handlePageChange = (page: number) => {
  setCurrentPage(page);
  if (page === 1) {
    setSearchParams({}); // ✅ remove ?page=1 from URL
  } else {
    setSearchParams({ page: String(page) });
  }
  window.scrollTo(0, 0);
};


  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery<CardItem[]>({
    queryKey: ["blogPosts"],
    queryFn: fetchBlogPosts,
    staleTime: 1000 * 60 * 5,
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
            <div className="flex justify-center items-center mt-10 space-x-3 flex-wrap">
              {currentPage > 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)}>
                  <NormalButton label="Prev" bgColor="#5DA6D8" />
                </button>
              )}

              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-1 cursor-pointer rounded ${
                      currentPage === page
                        ? "bg-[#5DA6D8] text-black"
                        : "hover:bg-gray-300 bg-[#EEEEEE]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {currentPage < totalPages && (
                <button onClick={() => handlePageChange(currentPage + 1)}>
                  <NormalButton label="Next" bgColor="#5DA6D8" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BlogList;
