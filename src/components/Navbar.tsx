// Navbar.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { IoMenu } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import NavSectionContent from "./NavSectionContent";
import { Link } from "react-router-dom";

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.7 },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.4 },
  },
};

const navItems = [
  { name: "LAST GENERATION", key: "last-generation" },
  { name: "WISE AND SANE", key: "sosioloji" },
  { name: "THE PURPOSE", key: "purpose" },
  { name: "THE EDITOR", key: "editor" },
  // { name: "CONTRIBUTORS", key: "contributors" },
  // { name: "JOIN THE MOVEMENT", key: "movement" },
  // { name: "FILOSOFI", key: "filosofi" },
  // { name: "IDEA IS CAP", key: "ideaiscapital" },
  { name: "CONNECT", key: "connect" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleNavClick = (key: string) => {
    setActiveSection(key); // opens content
  };

const closeSection = () => {
    setActiveSection(null); // closes content
  };

  useEffect(() => {
  if (menuOpen) {
    document.body.style.overflow = "hidden"; // disable scroll
  } else {
    document.body.style.overflow = ""; // restore scroll
  }

  // Cleanup when unmounting
  return () => {
    document.body.style.overflow = "";
  };
}, [menuOpen]);
  return (
    <nav className="w-full z-50 relative">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="flex items-center justify-between min-h-[100px] md:min-h-[200px] relative">
          <p className="text-3xl md:text-6xl font-bold tracking-tight text-gray-800">
            <Link to="/">
              <span className="block md:hidden">wiseandsane</span>
            </Link>
            <Link to="/">
              <span className="hidden md:block md:absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                wiseandsane
              </span>
            </Link>
          </p>

          <div
            className="text-3xl md:text-5xl text-gray-700 cursor-pointer rotate-90 block md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2"
            onClick={() => setMenuOpen(true)}
          >
            <IoMenu />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen  && (
          <motion.div
            className="fixed inset-0 bg-nav z-40 flex items-center justify-center"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Close Icon */}
            <div
              className="absolute top-5 right-5 text-4xl cursor-pointer z-50"
              onClick={() => setMenuOpen(false)}
            >
              <GrClose color="#000000" />
            </div>

            {/* Nav Items */}
            <motion.ul
              className="w-full text-xl sm:text-3xl space-y-5 font-light text-center"
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {navItems.map((item, index) => (
                <motion.li key={item.key} variants={itemVariant}>
                  <button
                    onClick={() => handleNavClick(item.key)}
                    className={`hover:text-blue-400 tracking-[3px] cursor-pointer text-black transition ${
                      index === 0
                        ? "text-2xl md:text-4xl font-bold"
                        : "text-xl font-light"
                    }`}
                  >
                    {item.name}
                  </button>
                  {item.name === "LAST GENERATION" && (
                    <div className="h-px w-[80%]  md:w-130 mx-auto bg-black/20 mt-9" />
                  )}
                  {item.name === "JOIN THE MOVEMENT" && (
                    <div className="h-px w-[80%]  md:w-80 mx-auto bg-black/20 mt-9" />
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-Up Section Content */}
      <AnimatePresence>
        {activeSection && (
          <NavSectionContent section={activeSection} onClose={closeSection} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
