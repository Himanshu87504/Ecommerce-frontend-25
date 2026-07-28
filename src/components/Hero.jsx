import React from "react";
import { ArrowRight, ShieldCheck, Truck, Zap } from "lucide-react";
import { Button } from "./ui/button";

const Hero = ({ navigate }) => {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* speed-line texture + angled base */}
      <div className="absolute inset-0 bg-speedlines" />
      <div
        className="absolute -bottom-1 left-0 right-0 h-16 bg-background"
        style={{ clipPath: "polygon(0 100%, 100% 40%, 100% 100%)" }}
      />

      <div className="relative container mx-auto px-6 pt-28 pb-32 sm:pt-36 sm:pb-40">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            <Zap className="h-4 w-4" />
            Same-day dispatch on 1000+ items
          </span>

          <h1 className="mt-6 font-display text-5xl sm:text-7xl font-bold leading-[0.95] text-balance">
            Shop fast.
            <br />
            Live better.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-primary-foreground/80 max-w-lg">
            QuickCart cuts the noise — real prices, fast checkout, and
            deliveries that actually show up when we say they will.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              onClick={() => navigate("/products")}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold group"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => navigate("/products")}
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Browse Categories
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-accent" /> Fast, tracked delivery
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" /> Secure checkout
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
