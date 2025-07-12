import React from "react";
import FancyLinkButton from "../components/Button";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  buttonLabel?: string;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  buttonLabel = "Learn More",
  onClick,
}) => {
  return (
    <div className="bg-white md:p-6 p-4 pb-1 md:pb-4 rounded-xl shadow overflow-hidden w-full max-w-[400px] mx-auto">
      <img
        src={image}
        alt={title}
        className="w-full h-[270px] object-cover rounded-lg"
      />
      <div className="py-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-800 bf text-xs mb-4">{description}</p>
        <button
          onClick={onClick}
          className="w-full"
        >
            <FancyLinkButton
                label={buttonLabel}
                to="#"
                block
            />
          
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
