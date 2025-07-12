// // src/utils/motionWrapper.tsx
// import { motion } from 'framer-motion';

// interface PageWrapperProps {
//   children: React.ReactNode;
//   disableEntryAnimation?: boolean;
// }

// export const PageWrapper = ({ children, disableEntryAnimation = false }: PageWrapperProps) => (
//   <motion.div
//     initial={disableEntryAnimation ? false : { opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: -20 }}
//     transition={{ duration: 0.4 }}
//   >
//     {children}
//   </motion.div>
// );


// src/utils/motionWrapper.tsx
import { motion } from "framer-motion";

interface PageWrapperProps {
  children: React.ReactNode;
  disableEntryAnimation?: boolean;
}

export const PageWrapper = ({
  children,
  disableEntryAnimation = false,
}: PageWrapperProps) => (
  <motion.div
    initial={
      disableEntryAnimation
        ? false
        : {
            opacity: 0,
            y: 40, // slide up into view
          }
    }
    animate={{
      opacity: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      y: 20,
    }}
    transition={{
      duration: 0.5,
      ease: [0.25, 0.8, 0.25, 1], // easeOut
    }}
  >
    {children}
  </motion.div>
);
