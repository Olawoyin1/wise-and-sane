// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";

// // const images = [
// //   "../../Images/car.webp",
// //   "../../Images/card.webp",
// //   "../../Images/card-image-4-D7xxZtUD.webp",
// // ];

// // const ImageGallery = () => {
// //   const [selectedImage, setSelectedImage] = useState<string | null>(null);

// //   // Close on ESC
// //   useEffect(() => {
// //     const handleKeyDown = (e: KeyboardEvent) => {
// //       if (e.key === "Escape") setSelectedImage(null);
// //     };
// //     window.addEventListener("keydown", handleKeyDown);
// //     return () => window.removeEventListener("keydown", handleKeyDown);
// //   }, []);

// //   return (
// //     <div className="w-full max-w-6xl mx-auto mt-9 relative">
// //       {/* Image Grid */}
// //       <div className="grid grid-cols-3 gap-4">
// //         {images.map((src, index) => (
// //           <img
// //             key={index}
// //             src={src}
// //             alt={`Gallery ${index}`}
// //             onClick={() => setSelectedImage(src)}
// //             className="w-full h-auto sm:h-[200px] object-cover rounded-lg cursor-pointer shadow transition-shadow duration-300 hover:shadow-2xl"
// //           />
// //         ))}
// //       </div>

// //       {/* Bottom-right caption */}
// //       <div className="absolute -bottom-8 right-4 text-sm text-gray-500">
// //         Example caption
// //       </div>

// //       {/* Fullscreen view */}
// //       <AnimatePresence>
// //         {selectedImage && (
// //           <motion.div
// //             key="overlay"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             onClick={() => setSelectedImage(null)}
// //             className="fixed inset-0 bg-black/80 px-5 flex items-center justify-center z-50"
// //           >
// //             <motion.img
// //               key="zoomed"
// //               src={selectedImage}
// //               initial={{ scale: 0.8, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.8, opacity: 0 }}
// //               transition={{ duration: 0.3 }}
// //               className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
// //               onClick={(e) => e.stopPropagation()}
// //             />
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default ImageGallery;



// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const images = [
//   "../../Images/car.webp",
//   "../../Images/card.webp",
//   "../../Images/three.webp",
// ];

// const ImageGallery = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   // Determine grid column count
//   const getGridColsClass = () => {
//     if (images.length === 1) return "grid-cols-1";
//     if (images.length === 2) return "grid-cols-2";
//     return "grid-cols-3";
//   };

//   // Close on ESC
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setSelectedImage(null);
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   return (
//     <div className="w-full max-w-6xl mx-auto mt-9 relative">
//       {/* Image Grid */}
//       <div className={`grid gap-4 ${getGridColsClass()}`}>
//         {images.map((src, index) => (
//           <img
//             key={index}
//             src={src}
//             alt={`Gallery ${index}`}
//             onClick={() => setSelectedImage(src)}
//             // className="w-full h-auto  object-cover rounded-lg cursor-pointer shadow transition-shadow duration-300 hover:shadow-2xl"
//             className={`w-full object-cover rounded-lg cursor-pointer shadow transition-shadow duration-300 hover:shadow-2xl ${
//   images.length === 1 ? "h-[300px]" : "h-auto sm:h-[200px]"
// }`}

//           />
//         ))}
//       </div>

//       {/* Bottom-right caption */}
//       <div className="absolute -bottom-8 right-4 text-sm text-gray-500">
//         Example caption
//       </div>

//       {/* Fullscreen view */}
//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             key="overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedImage(null)}
//             className="fixed inset-0 bg-black/80 px-5 flex items-center justify-center z-50"
//           >
//             <motion.img
//               key="zoomed"
//               src={selectedImage}
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ImageGallery;



import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
  images: string[];
  caption?: string;
}

const ImageGallery = ({ images, caption = "Example caption" }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Grid column class based on image count
  const getGridColsClass = () => {
    if (images.length === 1) return "grid-cols-1";
    if (images.length === 2) return "grid-cols-2";
    return "grid-cols-3";
  };

  // Escape key closes viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mt-9 relative">
      {/* Image Grid */}
      <div className={`grid gap-4 ${getGridColsClass()}`}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index}`}
            onClick={() => setSelectedImage(src)}
            className={`w-full object-cover rounded-lg cursor-pointer shadow transition-shadow duration-300 hover:shadow-2xl ${
              images.length === 1 ? "h-[300px]" : "h-auto sm:h-[200px]"
            }`}
          />
        ))}
      </div>

      {/* Bottom-right caption */}
      <div className="absolute -bottom-8 right-4 text-sm text-gray-500">
        {caption}
      </div>

      {/* Fullscreen view */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 px-5 flex items-center justify-center z-50"
          >
            <motion.img
              key="zoomed"
              src={selectedImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
