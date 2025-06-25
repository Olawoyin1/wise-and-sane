// src/utils/motionWrapper.tsx
import { motion } from 'framer-motion';

interface PageWrapperProps {
  children: React.ReactNode;
  disableEntryAnimation?: boolean;
}

export const PageWrapper = ({ children, disableEntryAnimation = false }: PageWrapperProps) => (
  <motion.div
    initial={disableEntryAnimation ? false : { opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);
