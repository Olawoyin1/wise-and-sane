// import React, { useState, useEffect } from "react";
// import { CardItem } from "../data/Types";
// import BlogHero from "../blog/BlogHero";
// import Share from "../blog/Share";
// import { motion } from "framer-motion";
// import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
// import { BiSolidQuoteAltRight } from "react-icons/bi";

// type BlogContentViewerProps = CardItem;

// const getHTMLBlocks = (html: string): string[] => {
//   // Wrap <img ...> with a div for centering using regex
//   const processedHtml = html.replace(
//     /<img([^>]+)>/gi,
//     `<div class="flex justify-center">
//       <img $1 class="max-w-full h-auto  shadow" />
//     </div>`
//   );

//   const container = document.createElement("div");
//   container.innerHTML = processedHtml;

//   const elements: Element[] = Array.from(container.children);
//   return elements.map((el) => el.outerHTML);
// };

// const BlogContentViewer: React.FC<BlogContentViewerProps> = ({
//   id,
//   title,
//   author,
//   created_at,
//   image,
//   body,
//   quote,
//   video,
//   contentImages = [],
//   blogContentVideo,
//   slug,
//   description,
//   category,
//   tag,
//   subTag,
//   subTagC,
//   buttonLabel = "Read More",
//   buttonLink = "#",
//   buttonBgColor = "#FFD682",
// }) => {
//   const [blocks, setBlocks] = useState<string[]>([]);
//   const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

//   useEffect(() => {
//   if (lightboxIndex !== null) {
//     document.body.style.overflow = "hidden"; // Disable scroll
//   } else {
//     document.body.style.overflow = ""; // Restore scroll
//   }

//   // Cleanup when component unmounts
//   return () => {
//     document.body.style.overflow = "";
//   };
// }, [lightboxIndex]);

//   useEffect(() => {
//     setBlocks(getHTMLBlocks(body));
//   }, [body]);

//   const firstPart = blocks.slice(0, 2);
//   const remainingPart = blocks.slice(2);

//   const blog = {
//     id,
//     title,
//     author,
//     created_at,
//     image,
//     slug,
//     body,
//     description,
//     category,
//     tag,
//     subTag,
//     subTagC,
//     buttonLabel,
//     buttonLink,
//     buttonBgColor,
//   };

//   return (
//     <article className="prose prose-lg max-w-3xl mx-auto px-8 sm:px-6">
//       <BlogHero blog={blog} height="medium" />

//       <h1 className="text-2xl sm:text-4xl text-center font-semibold mt-6">
//         {title}
//       </h1>

//       <div className="flex w-fit mx-auto mt-6 gap-8 items-center mb-10 justify-center">
//         <p className="text-base text-gray-600">
//           {new Date(created_at).toDateString()}
//         </p>
//         <div className="flex items-center gap-2">
//           <div className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden bg-black/30 rounded-full">
//             <img
//               src="https://th.bing.com/th/id/OIP.ItvA9eX1ZIYT8NHePqeuCgHaHa?w=210"
//               alt="Author"
//               className="object-cover"
//             />
//           </div>
//           <p className="font-bold">{author}</p>
//         </div>
//       </div>

//       {/* First 2 blocks */}
//       {firstPart.map((block, i) => (
//         <div
//           className="bf"
//           key={i}
//           dangerouslySetInnerHTML={{ __html: block }}
//         />
//       ))}

//       {/* Quote */}
    //   {quote?.trim() && (
    //     <blockquote className="relative min-h-50 flex items-center justify-center text-sm md:text-xl leading-8 p-10  rounded text-gray-700 my-8">
    //       {quote.trim()}
    //       <BiSolidQuoteAltRight className="absolute text-gray-300  text-7xl bottom-4 z-[-1] right-4" />
    //     </blockquote>
    //   )}

//       {/* Remaining blocks */}
//       {remainingPart.map((block, i) => (
//         <div
//           className="bf m-0 pb-0"
//           key={i + 2}
//           dangerouslySetInnerHTML={{ __html: block }}
//         />
//       ))}

//       {/* Blog Main Video */}
//       {video && (
//         <video
//           controls
//           className="w-full rounded-lg shadow mt-7 mb-6"
//           preload="metadata"
//         >
//           <source src={video} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       )}

//       {/* Optional Content Video */}
//       {blogContentVideo && (
//         <video
//           controls
//           className="w-full rounded-lg shadow mt-10 mb-6"
//           preload="metadata"
//         >
//           <source src={blogContentVideo} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       )}

//       {/* Grid Image Gallery */}
//       {contentImages.length > 0 && (
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
//           {contentImages.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt={`Gallery ${i + 1}`}
//               className="w-full h-40 object-cover rounded-lg shadow cursor-pointer"
//               onClick={() => setLightboxIndex(i)}
//             />
//           ))}
//         </div>
//       )}

//       {/* Lightbox */}
//       {lightboxIndex !== null && (
//         <div
//           className="fixed overflow-hidden inset-0 bg-[#FFF6E6] z-50 flex p-1 items-center justify-center"
//           onClick={() => setLightboxIndex(null)}
//         >
//           <div
//             className="relative flex flex-col items-end"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Fullscreen Left Arrow */}
//             <button
//               onClick={() =>
//                 setLightboxIndex(
//                   lightboxIndex === 0
//                     ? contentImages.length - 1
//                     : lightboxIndex - 1
//                 )
//               }
//               className="fixed cursor-pointer left-0 top-0 bottom-0 flex items-center justify-center w-18 font-bold text-xl -mt-10 md:mt-0 md:text-4xl z-50"
//             >
//               <FaArrowLeftLong />
//             </button>

//             {/* Animated Image */}
//             <motion.img
//               key={contentImages[lightboxIndex]}
//               src={contentImages[lightboxIndex]}
//               alt={`Gallery ${lightboxIndex + 1}`}
//               className="max-h-[90vh] max-w-auto w-[600px] object-contain  shadow"
//             />

//             {/* Index below image */}
//             <div className="mt-3 text-lg px-3 py-1  rounded ">
//               {lightboxIndex + 1} of {contentImages.length}
//             </div>

//             {/* Fullscreen Right Arrow */}
//             <button
//               onClick={() =>
//                 setLightboxIndex(
//                   lightboxIndex === contentImages.length - 1
//                     ? 0
//                     : lightboxIndex + 1
//                 )
//               }
//               className="fixed cursor-pointer right-0 top-0 bottom-0 flex items-center justify-center w-16 -mt-10 md:mt-0  text-xl md:text-4xl z-50"
//             >
//               <FaArrowRightLong />
//             </button>
//           </div>
//         </div>
//       )}

//       <Share />
//     </article>
//   );
// };

// export default BlogContentViewer;

const PC = () => {
  return (
    <div>PC</div>
  )
}

export default PC