import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart, Loader } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CartData } from "@/context/CartContext";
import { UserData } from "@/context/UserContext";

const ProductCard = ({ product, latest }) => {
  const navigate = useNavigate();
  const { addToCart } = CartData();
  const { isAuth } = UserData();
  const [btnLoading, setBtnLoading] = useState(false);

  if (!product) return null;

  const outOfStock = product.stock <= 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuth) {
      navigate("/login");
      return;
    }
    if (outOfStock || btnLoading) return;

    setBtnLoading(true);
    await addToCart(product._id);
    setBtnLoading(false);
  };

  return (
    <div className="group w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-2xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <Link to={`/product/${product._id}`}>
        <div className="relative h-48 sm:h-56 md:h-64 bg-muted flex justify-center items-center overflow-hidden">
          <img
            src={product.images[0].url}
            alt={product.title}
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
          {latest === "yes" && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground hover:bg-accent">
              New
            </Badge>
          )}
          {outOfStock && (
            <Badge
              variant="destructive"
              className="absolute top-3 right-3"
            >
              Out of Stock
            </Badge>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div
          className="cursor-pointer flex-1"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <h3 className="text-md sm:text-lg font-semibold truncate">
            {product.title.slice(0, 30)}
          </h3>
          <p className="text-xs sm:text-sm mt-1 truncate text-muted-foreground">
            {product.about.slice(0, 30)}
          </p>

          <div className="flex items-center justify-between mt-3">
            <p className="text-lg font-bold font-display">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>
            <span className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              View <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={outOfStock || btnLoading}
          className="w-full mt-4"
          size="sm"
        >
          {btnLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : outOfStock ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
