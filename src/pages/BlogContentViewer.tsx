import React, { useEffect, useRef, useState } from "react";
import { CardItem } from "../data/Types";
import BlogHero from "../blog/BlogHero";
import Share from "../blog/Share";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { BiSolidQuoteAltRight } from "react-icons/bi";
// import Callout from "../blog/Callout";
import ProductCard from "../blog/ProductCard";

interface CalloutType {
  solution?: string;
  change?: string;
  action?: string;
  purpose?: string;
}

interface ProductCardType {
  image: string;
  title: string;
  details: string;
  link: string;
}

interface BlogContentViewerProps extends CardItem {
  callout?: CalloutType;
  product_card?: ProductCardType;
}


const slugify = (text: string | null | undefined): string =>
  (text ?? "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const BlogContentViewer: React.FC<BlogContentViewerProps> = (props) => {
  const {
    id,
    title,
    author,
    created_at,
    image,
    body,
    quote,
    contentImages = [],
    blogContentVideo,
    slug,
    description,
    category,
    tag,
    subTag,
    subTagC,
    buttonLabel = "Read More",
    buttonLink = "#",
    buttonBgColor = "#FFD682",
    callout,
    product_card,
  } = props;
 
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const tocRef = useRef<HTMLDivElement>(null);

  const parser = new DOMParser();
  const doc = parser.parseFromString(body, "text/html");
  const headings = Array.from(doc.querySelectorAll("h1"));

  const sections = headings.map((heading, index) => {
    const id = heading.id || slugify(heading.textContent || `section-${index}`);
    heading.id = id;
    const sectionContentNodes: ChildNode[] = [];
    let next = heading.nextSibling;
    while (next && next.nodeName !== "H1") {
      sectionContentNodes.push(next);
      next = next.nextSibling;
    }
    const container = document.createElement("div");
    sectionContentNodes.forEach((node) => {
      if (
        node.nodeType === Node.ELEMENT_NODE ||
        node.nodeType === Node.TEXT_NODE
      ) {
        container.appendChild(node.cloneNode(true));
      }
    });
    return {
      id,
      title: heading.textContent || `Section ${index + 1}`,
      content: container.innerHTML,
    };
  });

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tocRef.current && !tocRef.current.contains(event.target as Node)) {
        setTocOpen(false);
      }
    };
    if (tocOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [tocOpen]);

  const blog = {
    id,
    title,
    author,
    created_at,
    image,
    slug,
    body,
    description,
    category,
    tag,
    subTag,
    subTagC,
    buttonLabel,
    buttonLink,
    buttonBgColor,
    
  };

  console.log(callout)

  const activeSection =
    sections.find((s) => s.id === activeSectionId) || sections[0];
  const sectionDoc = parser.parseFromString(activeSection.content, "text/html");
  const paragraphs = Array.from(sectionDoc.querySelectorAll("p"));
  const unorderedList = sectionDoc.querySelector("ul");

  const restContent = Array.from(sectionDoc.body.children).filter(
    (node) =>
      !paragraphs.slice(0, 4).includes(node as HTMLParagraphElement) &&
      node !== unorderedList
  );

  return (
    <>
      <BlogHero blog={blog} height="medium" />
      <article className="prose prose-lg max-w-3xl mx-auto px-8 sm:px-6 scroll-smooth">
        <h1 className="text-2xl sm:text-4xl max-w-xl mx-auto text-center font-semibold mt-6">
          {title}
        </h1>

        <div className="flex w-fit mx-auto mt-6 gap-8 items-center mb-10 justify-center">
          <p className="text-base text-gray-600">
            {new Date(created_at).toDateString()}
          </p>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden bg-black/30 rounded-full">
              <img
                src="https://th.bing.com/th/id/OIP.ItvA9eX1ZIYT8NHePqeuCgHaHa?w=210"
                alt="Author"
                className="object-cover"
              />
            </div>
            <p className="font-bold">{author}</p>
          </div>
        </div>

        {/* TOC */}
        {sections.length > 1 && (
          <div className="mb-6 border-b border-gray-200 pb-4" ref={tocRef}>
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="w-full py-2 text-left flex justify-between items-center"
            >
              <span className="text-gray-800 font-medium">
                Table of Contents
              </span>
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                  tocOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <AnimatePresence>
              {tocOpen && (
                <motion.ul
                  key="toc-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden space-y-2 mt-2"
                >
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => {
                          setActiveSectionId(section.id);
                          setTocOpen(false);
                        }}
                        className={`text-left cursor-pointer hover:underline ${
                          activeSectionId === section.id
                            ? "text-black font-bold"
                            : "text-gray-600"
                        }`}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Section Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSectionId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {paragraphs.slice(0, 4).map((p, i) => (
              <div
                key={i}
                className="mb-4 text-sm sm:text-[15px] bf"
                dangerouslySetInnerHTML={{ __html: p.outerHTML }}
              />
            ))}

            {unorderedList && (
              <div
                className="mb-6 text-sm sm:text-[15px] bf"
                dangerouslySetInnerHTML={{
                  __html: unorderedList.outerHTML.replace(
                    "<ul",
                    '<ul class="list-disc pl-5"'
                  ),
                }}
              />
            )}

            {/* Quote appears here */}
            {quote && (
              <blockquote className="relative min-h-50 flex items-center justify-center text-sm md:text-[17px] leading-8 p-10 rounded text-gray-700 my-8">
                {quote}
                <BiSolidQuoteAltRight className="absolute text-gray-300 text-7xl bottom-4 z-[-1] right-4" />
              </blockquote>
            )}

            {/* Rest Content */}
            <div className="mt-8 bf text-sm sm:text-[15px] space-y-6">
              {restContent.map((node, i) => {
                let html = (node as HTMLElement).outerHTML;
                html = html.replace(/<img\s/gi, '<img class="w-full" ');
                return (
                  <div
                    key={i}
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Video */}
        <div className="w-full mt-6 mb-6">
          {blogContentVideo ? (
            <video
              controls
              className="w-full rounded-lg shadow"
              preload="metadata"
            >
              <source src={blogContentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex items-center justify-center border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
              <div className="text-center text-gray-500">
                <p className="font-semibold">
                  Blog content video not available
                </p>
                <p className="text-sm">
                  A preview will appear here when provided.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Callouts */}

        {callout && (
          <div className="grid gap-4 mt-6">
            {callout.solution && (
              <div className="bg-[#E4F5FC] bf p-4 rounded-lg border border-gray-300 flex items-start gap-3">
                <span className="text-xl">💡</span>
                <p className="text-gray-700 text-xs leading-5 md:text-sm md:leading-7">
                  {callout.solution}
                </p>
              </div>
            )}
            {callout.change && (
              <div className="bg-[#FDF3E0] bf p-4 rounded-lg border border-gray-300 flex items-start gap-3">
                <span className="text-xl">💪</span>
                <p className="text-gray-700 text-xs leading-5 md:text-sm md:leading-7">
                  {callout.change}
                </p>
              </div>
            )}
            {callout.action && (
              <div className="bg-[#E6F6E8] bf p-4 rounded-lg border border-gray-300 flex items-start gap-3">
                <span className="text-xl">✔️</span>
                <p className="text-gray-700 text-xs leading-5 md:text-sm md:leading-7">
                  {callout.action}
                </p>
              </div>
            )}
            {callout.purpose && (
              <div className="bg-[#FCEBF6] bf p-4 rounded-lg border border-gray-300 flex items-start gap-3">
                <span className="text-xl">👍</span>
                <p className="text-gray-700 text-xs leading-5 md:text-sm md:leading-7">
                  {callout.purpose}
                </p>
              </div>
            )}
          </div>
        )}

        {/* <div className="mt-10 grid bf grid-cols-1 gap-4">
        {(callouts.length > 0
          ? callouts
          : ["<p>No callouts provided.</p>"]
        ).map((html, i) => (
          <div
            key={i}
            className="border border-yellow-300 bg-yellow-50 p-4 rounded shadow"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
      </div> */}

        {/* Image Gallery */}
        {contentImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
            {contentImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-40 object-cover rounded-lg shadow cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div
            className="fixed overflow-hidden inset-0 bg-[#FFF6E6] z-50 flex p-1 items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative flex flex-col items-end"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() =>
                  setLightboxIndex(
                    lightboxIndex === 0
                      ? contentImages.length - 1
                      : lightboxIndex - 1
                  )
                }
                className="fixed left-0 top-0 bottom-0 flex items-center justify-center w-18 text-xl md:text-4xl z-50"
              >
                <FaArrowLeftLong />
              </button>

              <motion.img
                key={contentImages[lightboxIndex]}
                src={contentImages[lightboxIndex]}
                alt={`Gallery ${lightboxIndex + 1}`}
                className="max-h-[90vh] w-[600px] object-contain shadow"
              />

              <div className="mt-3 text-lg px-3 py-1">
                {lightboxIndex + 1} of {contentImages.length}
              </div>

              <button
                onClick={() =>
                  setLightboxIndex(
                    lightboxIndex === contentImages.length - 1
                      ? 0
                      : lightboxIndex + 1
                  )
                }
                className="fixed right-0 top-0 bottom-0 flex items-center justify-center w-16 text-xl md:text-4xl z-50"
              >
                <FaArrowRightLong />
              </button>
            </div>
          </div>
        )}

        {/* Product Card */}
        {product_card && (
  <div className="mt-10">
    <ProductCard
      image={product_card.image}
      title={product_card.title}
      description={product_card.details}
      buttonLabel="Purchase this product"
      onClick={() => window.open(product_card.link, "_blank")}
    />
  </div>
)}


        {/* <div className="mt-10">
        {productCard || (
          <div className="border border-dashed border-gray-400 p-6 rounded-lg text-center text-gray-500">
            Product coming soon. Stay tuned!
          </div>
        )}
      </div> */}
        

        <Share />
      </article>
    </>
  );
};

export default BlogContentViewer;
