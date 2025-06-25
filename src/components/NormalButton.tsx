// // src/components/NormalButton.tsx
// import React, { useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface NormalButtonProps {
//   label: string;
//   bgColor?: string;
//   color?: string;
// }

// const NormalButton: React.FC<NormalButtonProps> = ({
//   label,
//   bgColor = "#E8D4C3",
//   color = "#333",
// }) => {
//   const btnRef = useRef<HTMLDivElement>(null);
//   const [coords, setCoords] = useState({ x: 0, y: 0 });
//   const [hovered, setHovered] = useState(false);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const rect = btnRef.current?.getBoundingClientRect();
//     if (!rect) return;
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setCoords({ x, y });
//   };

//   return (
//     <div
//       ref={btnRef}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onMouseMove={handleMouseMove}
//       className="relative inline-flex items-center justify-center px-6 py-2 text-xs sm:text-sm font-bold rounded-full cursor-pointer my-2 transition-transform duration-300"
//       style={{ backgroundColor: bgColor, color }}
//     >
//       {/* Animated border */}
//       <motion.span
//         className="absolute border border-black rounded-full pointer-events-none"
//         initial={{
//           width: "100%",
//           height: "100%",
//           transform: "translate(6px, 6px)",
//           opacity: 1,
//         }}
//         animate={
//           hovered
//             ? {
//                 width: 17,
//                 height: 17,
//                 left: coords.x - 12,
//                 top: coords.y - 12,
//                 transform: "translate(0, 0)",
//               }
//             : {
//                 width: "100%",
//                 height: "100%",
//                 left: 0,
//                 top: 0,
//                 transform: "translate(4px, 4px)",
//               }
//         }
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       />

//       {/* Follower circle */}
//       <AnimatePresence>
//         {hovered && (
//           <motion.span
//             key="cursor-circle"
//             className="absolute w-4 h-4 bg-white rounded-full pointer-events-none"
//             animate={{
//               left: coords.x - 10,
//               top: coords.y - 10,
//               opacity: 1,
//             }}
//             exit={{ opacity: 0 }}
//             transition={{ type: "spring", stiffness: 250, damping: 20 }}
//           />
//         )}
//       </AnimatePresence>

//       {/* Label */}
//       <span className="relative z-10">{label}</span>
//     </div>
//   );
// };

// export default NormalButton;


// src/components/NormalButton.tsx
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NormalButtonProps {
  label: string;
  bgColor?: string;
  color?: string;
  block?: boolean; // New prop
}

const NormalButton: React.FC<NormalButtonProps> = ({
  label,
  bgColor = "#E8D4C3",
  color = "#333",
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
    <div
      ref={btnRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative ${block ? "w-full flex" : "inline-flex"} items-center justify-center px-6 py-2 text-xs sm:text-sm font-bold rounded-full cursor-pointer my-2 transition-transform duration-300`}
      style={{ backgroundColor: bgColor, color }}
    >
      {/* Animated border */}
      <motion.span
        className="absolute border border-black rounded-full pointer-events-none"
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

      {/* Follower circle */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="cursor-circle"
            className="absolute w-4 h-4 bg-white rounded-full pointer-events-none"
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

      {/* Label */}
      <span className="relative z-10">{label}</span>
    </div>
  );
};

export default NormalButton;
