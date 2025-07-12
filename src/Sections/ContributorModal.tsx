import { motion } from "framer-motion";
import { GrClose } from "react-icons/gr";
import { Contributor } from "./Contributors";

interface ContributorModalProps {
  contributor: Contributor;
  onClose: () => void;
}

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const modalVariants = {
  initial: { scale: 0.8, y: 50, opacity: 0 },
  animate: { scale: 1, y: 0, opacity: 1 },
  exit: { scale: 0.8, y: 50, opacity: 0, transition: { duration: 0.3 } },
};

const ContributorModal: React.FC<ContributorModalProps> = ({ contributor, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
      variants={backdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="bg-[#FFF6E6] w-full max-w-md rounded shadow p-6 relative text-center"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
          onClick={onClose}
        >
          <GrClose />
        </button>

        {/* Image */}
        <img
          src={contributor.imageUrl}
          alt={contributor.name}
          className="w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow-md"
        />

        {/* Name */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{contributor.name}</h2>

        {/* About */}
        <p className="text-gray-700 text-sm leading-relaxed">{contributor.about}</p>
      </motion.div>
    </motion.div>
  );
};

export default ContributorModal;
