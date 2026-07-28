import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-16 border-t bg-secondary/40">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-xs">
            <h1 className="font-display text-xl font-bold">
              Quick<span className="text-primary">Cart</span>
            </h1>
            <p className="text-sm mt-2 text-muted-foreground">
              Real prices, fast checkout, and deliveries that show up on
              time. That's the whole pitch.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                aria-label="Facebook"
                className="h-9 w-9 flex items-center justify-center rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="h-9 w-9 flex items-center justify-center rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="h-9 w-9 flex items-center justify-center rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Youtube"
                className="h-9 w-9 flex items-center justify-center rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-semibold mb-3">Company</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">Legal</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="" className="hover:text-foreground transition-colors">Terms &amp; Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} QuickCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
