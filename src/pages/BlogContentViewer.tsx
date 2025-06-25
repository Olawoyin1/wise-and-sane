// import React from "react";
// import { CardItem } from "../data/Types";
// import BlogHero from "../blog/BlogHero";
// import Share from "../blog/Share";

// type BlogContentViewerProps = CardItem;

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

//   console.log(blog)

//   return (
//     <article className="prose prose-lg max-w-3xl mx-auto px-4 sm:px-6">
//       {/* Blog Hero */}
//       <BlogHero blog={blog} height="medium" />

//       {/* Title & Meta */}
//       <h1 className="text-2xl sm:text-4xl text-center font-semibold mt-6">{title}</h1>
//       <div className="flex w-fit mx-auto mt-6 gap-8 items-center mb-10 justify-center">
//         <p className="text-base text-gray-600">{new Date(created_at).toDateString()}</p>
//         <div className="flex items-center gap-2">
//           <div className="img h-8 w-8 sm:h-10 sm:w-10 overflow-hidden bg-black/30 rounded-full">
//             <img
//               src="https://th.bing.com/th/id/OIP.ItvA9eX1ZIYT8NHePqeuCgHaHa?w=210"
//               alt="Author"
//               className="object-cover"
//             />
//           </div>
//           <p className="font-bold">{author}</p>
//         </div>
//       </div>

//       {/* Full Body Content */}
//       <div className="prose prose-lg bf max-w-none" dangerouslySetInnerHTML={{ __html: body }} />

//       {/* Quote */}
//       {quote?.trim() && (
//         <blockquote className="relative px-6 py-4 border-l-4 border-gray-400 bg-gray-50 rounded text-gray-700 my-8">
//           “{quote.trim()}”
//         </blockquote>
//       )}

//       {/* Main Video */}
//       {video && (
//         <video
//           controls
//           className="w-full rounded-lg shadow mt-10 mb-6"
//           preload="metadata"
//         >
//           <source src={video} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       )}

//       {/* Optional Blog Content Video */}
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

//       {/* Image Gallery */}
//       {contentImages.length > 0 && (
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
//           {contentImages.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt={`Gallery ${i + 1}`}
//               className="w-full h-40 object-cover rounded-lg shadow"
//             />
//           ))}
//         </div>
//       )}

//       <Share />
//     </article>
//   );
// };

// export default BlogContentViewer;


import React, { useState, useEffect } from "react";
import { CardItem } from "../data/Types";
import BlogHero from "../blog/BlogHero";
import Share from "../blog/Share";

type BlogContentViewerProps = CardItem;

// Extract all paragraphs (<p> and <img> too)
const getHTMLBlocks = (html: string): string[] => {
  const container = document.createElement("div");
  container.innerHTML = html;
  const elements: Element[] = Array.from(container.children);
  return elements.map((el) => el.outerHTML);
};

const BlogContentViewer: React.FC<BlogContentViewerProps> = ({
  id,
  title,
  author,
  created_at,
  image,
  body,
  quote,
  video,
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
}) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<string[]>([]);

  useEffect(() => {
    setBlocks(getHTMLBlocks(body));
  }, [body]);

  const firstPart = blocks.slice(0, 2);
  const remainingPart = blocks.slice(2);

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

  return (
    <article className="prose prose-lg max-w-3xl mx-auto px-4 sm:px-6">
      <BlogHero blog={blog} height="medium" />

      <h1 className="text-2xl sm:text-4xl text-center font-semibold mt-6">{title}</h1>
      <div className="flex w-fit mx-auto mt-6 gap-8 items-center mb-10 justify-center">
        <p className="text-base text-gray-600">{new Date(created_at).toDateString()}</p>
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

      {/* First 2 paragraphs or blocks */}
      {firstPart.map((block, i) => (
        <div className="bf" key={i} dangerouslySetInnerHTML={{ __html: block }} />
      ))}

      {/* Quote */}
      {quote?.trim() && (
        <blockquote className="relative px-6 py-4 border-l-4 border-gray-400 bg-gray-50 rounded text-gray-700 my-8">
          “{quote.trim()}”
        </blockquote>
      )}

      {/* Remaining body (paragraphs, images, etc) */}
      {remainingPart.map((block, i) => (
        <div className="bf" key={i + 2} dangerouslySetInnerHTML={{ __html: block }} />
      ))}

      {/* Blog Main Video */}
      {video && (
        <video
          controls
          className="w-full rounded-lg shadow mt-10 mb-6"
          preload="metadata"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Optional Content Video */}
      {blogContentVideo && (
        <video
          controls
          className="w-full rounded-lg shadow mt-10 mb-6"
          preload="metadata"
        >
          <source src={blogContentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Grid Image Gallery */}
      {contentImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
          {contentImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Gallery ${i + 1}`}
              className="w-full h-40 object-cover rounded-lg shadow cursor-pointer"
              onClick={() => setLightboxImage(img)}
            />
          ))}
        </div>
      )}

      {/* Lightbox View */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Full View"
            className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
          />
        </div>
      )}

      <Share />
    </article>
  );
};

export default BlogContentViewer;
