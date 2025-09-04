import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const ProductCard = ({ product, latest }) => {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto shadow-md rounded-lg border border-gray-200 bg-white dark:bg-gray-900 transition-all overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <div className="relative h-48 sm:h-56 md:h-64 bg-gray-100 flex justify-center items-center">
          <img
            src={product.images[0].url}
            alt={product.title}
            className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
          />
          {latest === "yes" && (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white">
              New
            </Badge>
          )}
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        <h3 className="text-md sm:text-lg font-semibold truncate">
          {product.title.slice(0, 30)}
        </h3>
        <p className="text-xs sm:text-sm mt-1 truncate">{product.about.slice(0, 30)}</p>
        <p className="text-sm mt-1 truncate font-medium">₹ {product.price}</p>

        <div className="flex items-center justify-center mt-4">
          <Button onClick={() => navigate(`/product/${product._id}`)} className="w-full">
            View Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
