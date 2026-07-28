import { LogIn, Search, ShoppingCart, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { UserData } from "@/context/UserContext";
import { CartData } from "@/context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { isAuth, logoutUser, user } = UserData();

  const { totalItem, setTotalItem } = CartData();

  const logoutHandler = () => {
    logoutUser(navigate, setTotalItem);
  };

  return (
    <div className="z-50 sticky top-0 bg-background/80 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <h1
          className="font-display text-2xl font-bold cursor-pointer tracking-tight shrink-0"
          onClick={() => navigate("/")}
        >
          Quick<span className="text-primary">Cart</span>
        </h1>

        <ul className="hidden sm:flex items-center gap-1 text-sm font-medium">
          <li
            className="cursor-pointer rounded-full px-4 py-2 hover:bg-secondary transition-colors"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="cursor-pointer rounded-full px-4 py-2 hover:bg-secondary transition-colors"
            onClick={() => navigate("/products")}
          >
            Products
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button
            className="hidden md:flex items-center gap-2 rounded-full border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground hover:bg-secondary transition-colors"
            onClick={() => navigate("/products")}
          >
            <Search className="h-4 w-4" />
            Search products…
          </button>

          <button
            className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-secondary transition-colors"
            onClick={() => navigate("/cart")}
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItem > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {totalItem}
              </span>
            )}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-secondary transition-colors"
                aria-label="Account"
              >
                {isAuth ? <User className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!isAuth ? (
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  Login
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    Your Orders
                  </DropdownMenuItem>
                  {user && user.role === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logoutHandler}>
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
