// src/components/ScrollToTopButton.tsx
// import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const CButton = () => {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.scrollY > 300) {
//         setVisible(true);
//       } else {
//         setVisible(false);
//       }
//     };

//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

  return (
    <Link to="/create"
    //   onClick={scrollToTop}
      className={`fixed bottom-14 left-5 z-50 p-3 rounded-full bg-[#FFD682] shadow-lg transition-all cursor-pointer hover:bg-yellow-200  duration-300 w-12 h-12 flex items-center justify-center text-xl "opacity-100" : "opacity-0"
      }`}
      aria-label="Scroll to top"
    >

      +
    </Link>
  );
};

export default CButton;


