import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogPosts } from "../api/Blog"; // your shared function
import { AnimatePresence, motion } from "framer-motion";
import { CardItem } from "../data/Types";
import SingleCard from "../components/SingleCard";
import SkeletonCard from "../components/SkeletonCard";
import NormalButton from "../components/NormalButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { PageWrapper } from "../components/PageWrapper";

const ITEMS_PER_PAGE = 6;

const CategoryPage = () => {
  const { tag } = useParams<{ tag: string }>();
  // const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentParam = searchParams.get("page");
  const initialPage = parseInt(currentParam || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Update page from URL
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (!pageParam || isNaN(Number(pageParam))) {
      setCurrentPage(1);
      setSearchParams({});
    } else {
      setCurrentPage(Number(pageParam));
    }
  }, [searchParams, setSearchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page === 1) {
      setSearchParams({});
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
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
  });

  const getPlainText = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const filteredPosts = posts.filter(
    (post) => post.category?.toLowerCase() === tag?.toLowerCase()
  );

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <PageWrapper>
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <PageHeader
          title={tag || "Category"}
          count={filteredPosts.length}
          type="category"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-20 place-items-center">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500">
            Failed to load posts.
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No posts found for category "{tag}".
          </div>
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
                    <SingleCard
                      item={{
                        ...item,
                        description:
                          getPlainText(item.body).slice(0, 150) + "...",
                        buttonLabel: "Read More",
                        buttonLink: `/post/${item.id}`,
                        category: item.category,
                        subtag: item.subtag,
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {filteredPosts.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center items-center mt-10 space-x-3 flex-wrap">
                {currentPage > 1 && (
                  <button onClick={() => handlePageChange(currentPage - 1)}>
                    <NormalButton label="Prev" bgColor="#FFE6B4" />
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
                          ? "bg-[#FFE6B4] text-black"
                          : "hover:bg-gray-300 bg-[#EEEEEE]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {currentPage < totalPages && (
                  <button onClick={() => handlePageChange(currentPage + 1)}>
                    <NormalButton label="Next" bgColor="#FFE6B4" />
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </PageWrapper>
  );
};

export default CategoryPage;
