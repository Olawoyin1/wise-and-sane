// src/components/ScrollToTopButton.tsx
import { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-14 right-5 z-50 p-3 rounded-full bg-[#FFD682] text-white shadow-lg transition-all cursor-pointer hover:bg-blue-900  duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Scroll to top"
    >

      <BsArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;


