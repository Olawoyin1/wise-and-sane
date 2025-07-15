import React, { useEffect, useRef, useState } from "react";
import { CardItem } from "../data/Types";
import BlogHero from "../blog/BlogHero";
import Share from "../blog/Share";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
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
    slug,
    description,
    category,
    tag,
    subtag,
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

  const sections: { id: string; title: string; content: string }[] = [];
  const childNodes = Array.from(doc.body.childNodes);

  let currentIndex = 0;

  // Capture leading nodes before first <h1> as "Untitled"
  const untitledNodes: ChildNode[] = [];
  while (
    currentIndex < childNodes.length &&
    !(childNodes[currentIndex].nodeName === "H1")
  ) {
    untitledNodes.push(childNodes[currentIndex]);
    currentIndex++;
  }
  if (untitledNodes.length > 0) {
    const container = document.createElement("div");
    untitledNodes.forEach((node) => {
      if (
        node.nodeType === Node.ELEMENT_NODE ||
        node.nodeType === Node.TEXT_NODE
      ) {
        container.appendChild(node.cloneNode(true));
      }
    });
    sections.push({
      id: "untitled",
      title: "Untitled",
      content: container.innerHTML,
    });
  }

  // Capture the rest of the <h1>-based sections
  const remaining = childNodes.slice(currentIndex);
  for (let i = 0; i < remaining.length; i++) {
    const node = remaining[i];
    if (node.nodeName === "H1") {
      const heading = node as HTMLElement;
      const id = heading.id || slugify(heading.textContent || `section-${i}`);
      heading.id = id;

      const title = heading.textContent || `Section ${i + 1}`;
      const contentNodes: ChildNode[] = [];
      i++;

      while (i < remaining.length && remaining[i].nodeName !== "H1") {
        contentNodes.push(remaining[i]);
        i++;
      }
      i--; // Adjust for outer loop

      const container = document.createElement("div");
      contentNodes.forEach((n) => container.appendChild(n.cloneNode(true)));

      sections.push({
        id,
        title,
        content: container.innerHTML,
      });
    }
  }

  useEffect(() => {
    if (sections.length > 0 && !activeSectionId) {
      setActiveSectionId(sections[0].id);
    }
  }, [sections, activeSectionId]);

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
    subtag,
    subTagC,
    buttonLabel,
    buttonLink,
    buttonBgColor,
  };

  const activeSection =
    sections.find((s) => s.id === activeSectionId) || sections[0];
  const sectionDoc = parser.parseFromString(activeSection.content, "text/html");
  const allElements = Array.from(sectionDoc.body.children);

  const first4 = allElements.slice(0, 4);
  const rest = allElements.slice(4);

  return (
    <>
      <BlogHero blog={blog} height="medium" />
      <article className="prose prose-lg max-w-3xl mx-auto px-8 sm:px-6 scroll-smooth">
        <h1 className="text-2xl sm:text-4xl max-w-xl mx-auto text-center font-semibold mt-7 md:mt-14">
          {title}
        </h1>

        <div className="flex w-fit mx-auto mt-6 gap-8 items-center mb-10 justify-center">
          <p className="text-base text-gray-600">
            {new Date(created_at).toDateString()}
          </p>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 overflow-hidden bg-black/30 rounded-full">
              <img
                src="https://th.bing.com/th/id/OIP.ItvA9eX1ZIYT8NHePqeuCgHaHa?w=210"
                alt="Author"
                className="object-cover"
              />
            </div>
            <p className="font-bold">{author}</p>
          </div>
        </div>

        {sections.length > 1 && (
          <div className="mb-6 border-b border-gray-500 pb-4" ref={tocRef}>
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="w-full py-2 text-left flex justify-between items-center"
            >
              <span className="text-gray-800 font-bold">Table of Contents</span>
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

        {/* Section Preview Content */}
        <motion.div
          key={activeSectionId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mt-8 bf text-sm sm:text-[15px] space-y-7">
            {first4.map((node, i) => {
              const html = node.outerHTML
                .replace(/<img\s/gi, '<img class="w-full" ')
                .replace(/<ul(\s|>)/gi, '<ul class="list-disc pl-5"$1')
                .replace(/<ol(\s|>)/gi, '<ol class="list-decimal pl-5"$1')
                .replace(/<li(\s|>)/gi, '<li class="mb-2"$1');

              return (
                <div
                  key={`rest-${i}`}
                  className="prose prose-sm sm:prose-base max-w-none"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              );
            })}
          </div>

          {/* Quote */}
          {activeSectionId === sections[0]?.id && quote && (
            <blockquote className="relative min-h-50 flex items-center justify-center text-sm md:text-[17px] leading-8 p-10 rounded text-gray-700 my-8">
              {quote}
              <BiSolidQuoteAltRight className="absolute text-gray-300 text-7xl bottom-4 z-[-1] right-4" />
            </blockquote>
          )}

          {/* Remaining content */}
          {/* <div className="max-w-none bf space-y-7">
            <div
              dangerouslySetInnerHTML={{
                __html: rest
                  .map((node) =>
                    node.outerHTML
                      .replace(/<img\s/gi, '<img class="w-full" ')
                      .replace(/<ul(\s|>)/gi, '<ul class="list-disc pl-5"$1')
                      .replace(/<ol(\s|>)/gi, '<ol class="list-decimal pl-5"$1')
                      .replace(/<li(\s|>)/gi, '<li class="mb-2"$1')
                  )
                  .join(""),
              }}
            />
          </div> */}


          <div
  className="prose prose-sm sm:prose-base text-sm sm:text-[15px] max-w-none space-y-7 bf mt-8"
  dangerouslySetInnerHTML={{
    __html: rest
      .map((node) => {
        let html = node.outerHTML;

        // Make images full width and add margin
        html = html.replace(/<img\s/gi, '<img class="w-full my-4" ');

        html = html.replace(
          /<(ul|ol)(.*?)>/gi,
          '<$1 class="list-disc pl-7  md:pl-16 my-4"$2>'
        );

        return html;
      })
      .join(""),
  }}
/>


        </motion.div>

        {/* ... (keep your video, gallery, callouts, lightbox logic here) ... */}
        {activeSectionId === sections[0]?.id && (
          <>
            {/* Video */}
            <div className="relative w-full mt-8 aspect-video rounded-xl overflow-hidden bg-black group shadow-lg">
              {/* Background shimmer or gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-gray-900 opacity-90" />

              {/* Fake play button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 4l10 6-10 6V4z" />
                  </svg>
                </div>
              </div>

              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10">
                <p className="text-white text-sm font-semibold">
                  Video not available
                </p>
                <p className="text-gray-300 text-xs">
                  A preview will appear here when provided.
                </p>
              </div>
            </div>
          </>
        )}

        {(sections.length <= 1 ||
          activeSectionId === sections[sections.length - 1]?.id) && (
          <>
            {/* Image Gallery */}
            {contentImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 md:gap-4 mt-10">
                {contentImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full md:h-40 object-cover rounded-lg shadow cursor-pointer"
                    onClick={() => setLightboxIndex(i)}
                  />
                ))}
              </div>
            )}

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
          </>
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
              <div className="mt-3 text-lg px-3 py-1 z-50">
                <IoCloseOutline
                  onClick={() => setLightboxIndex(null)}
                  className="cursor-pointer"
                  size={30}
                />
              </div>
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
                className="fixed right-0 top-0 bottom-0 flex items-center justify-center w-16 text-xl md:text-4xl z-20"
              >
                <FaArrowRightLong />
              </button>
            </div>
          </div>
        )}

        <Share />
      </article>
    </>
  );
};

export default BlogContentViewer;
