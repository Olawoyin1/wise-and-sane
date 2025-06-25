import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface FancyLinkButtonProps {
  label: string;
  to: string;
  bgColor?: string;
  textColor?: string;
  block?: boolean;
}

const BButton: React.FC<FancyLinkButtonProps> = ({
  label,
  to,
  bgColor = "#E8D4C3",
  textColor = "#333",
  block = false,
}) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <Link to={to} className={block ? "block w-full" : ""}>
      <div
        ref={btnRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className={`relative inline-flex items-center justify-center px-4 sm:px-9  py-[11px] text-xs md:text-sm font-bold rounded-full cursor-pointer my-2 ${block ? "w-full" : ""}`}
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {/* Decorative shrinking border */}
        <motion.span
          className="absolute border border-black rounded-full  pointer-events-none"
          initial={{
            width: "100%",
            height: "100%",
            transform: "translate(6px, 6px)",
            opacity: 1,
          }}
          animate={
            hovered
              ? {
                  width: 17,
                  height: 17,
                  left: coords.x - 12,
                  top: coords.y - 12,
                  transform: "translate(0, 0)",
                }
              : {
                  width: "100%",
                  height: "100%",
                  left: 0,
                  top: 0,
                  transform: "translate(4px, 4px)",
                }
          }
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Fading circle that follows mouse */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              key="cursor-circle"
              className="absolute w-4 h-4 bg-white rounded-full pointer-events-none "
              animate={{
                left: coords.x - 10,
                top: coords.y - 10,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            />
          )}
        </AnimatePresence>

        {/* Button Text */}
        <span className="relative ">{label}</span>
      </div>
    </Link>
  );
};

export default BButton;
