import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { ProductData } from "@/context/ProductContext";
import { categories } from "@/main";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();
  const { loading, products, newProd } = ProductData();

  const marqueeItems = [...categories, ...categories];

  return (
    <div>
      <Hero navigate={navigate} />

      {/* Category marquee — reinforces the "always moving" brand idea */}
      <div className="border-y bg-secondary/40 py-3 overflow-hidden">
        <div className="flex w-max marquee-track">
          {marqueeItems.map((cat, i) => (
            <span
              key={`${cat}-${i}`}
              className="mx-3 shrink-0 rounded-full border bg-background px-4 py-1.5 text-sm font-medium capitalize text-muted-foreground"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">
              Just landed
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1">
              Latest Products
            </h2>
          </div>
          <Button
            variant="ghost"
            className="hidden sm:flex text-primary hover:text-primary"
            onClick={() => navigate("/products")}
          >
            View all <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {newProd && newProd.length > 0 ? (
            newProd.map((e) => (
              <ProductCard key={e._id} product={e} latest={"yes"} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-12">
              No products yet — check back soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
