import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InlineImageViewerProps {
  src: string;
  alt?: string;
}

const InlineImageViewer = ({ src, alt }: InlineImageViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <img
        src={src}
        alt={alt || ""}
        className="w-full sm:h-[400px] object-cover rounded-lg cursor-pointer  transition duration-300 hover:shadow-lg my-6"
        onClick={() => setIsOpen(true)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.img
              src={src}
              alt={alt || ""}
              className="max-w-full max-h-full object-contain rounded-md shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InlineImageViewer;
