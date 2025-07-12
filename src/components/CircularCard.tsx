
import { motion } from "framer-motion";
import { useEffect, useState, ReactNode } from "react";

interface Social {
  icon: ReactNode;
  onClick?: () => void;
}

interface CircularCardProps {
  imageUrl: string;
  name?: string;
  socials?: Social[];
  hoverOffset?: { x: number; y: number };
}

const CircularCard = ({
  imageUrl,
  name = "",
  socials = [],
  hoverOffset = { x: -20, y: 4 },
}: CircularCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-[300px] mx-auto relative group">
      {/* Image Container */}
      <div
        className="relative w-64 h-64"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={() => isMobile && setIsHovered((prev) => !prev)}
      >
        {/* Background Image */}
        <div
          className="w-full h-full bg-cover bg-center rounded-full "
          style={{ backgroundImage: `url(${imageUrl})` }}
        />

        {/* Overlay Frame */}
        <motion.div
          animate={
            isHovered || isMobile
              ? { x: 0, y: 0 }
              : { x: hoverOffset.x, y: hoverOffset.y }
          }
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute top-0 left-0 w-full h-full border border-gray-900 rounded-full"
        >
          {/* Social Icons */}
          {socials.length > 0 && (
            <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
              {socials.map((social, i) => (
                <div
                  key={i}
                  className="p-2 bg-white rounded-full shadow border border-gray-300 cursor-pointer"
                  onClick={social.onClick}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* name */}
       <div className="absolute min-w-[200px]  flex-wrap  -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center  space-y-2">
             <div className="w-fit py-[4px] bg-white px-7 text-black rounded-full text-[15.4px] font-bold">
             {name}
             </div>
         </div>
        
        
      </div>
    </div>
  );
};

export default CircularCard;
