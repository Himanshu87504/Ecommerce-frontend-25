import HomePage from "@/components/admin/HomePage";
import InfoPage from "@/components/admin/InfoPage";
import OrdersPage from "@/components/admin/OrdersPage";
import { UserData } from "@/context/UserContext";
import { Home, Info, MenuIcon, ShoppingBag, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { key: "home", label: "Products", icon: Home },
  { key: "orders", label: "Orders", icon: ShoppingBag },
  { key: "info", label: "Insights", icon: Info },
];

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const { user } = UserData();

  if (user.role !== "admin") return navigate("/");

  const renderPageContent = () => {
    switch (selectedPage) {
      case "home":
        return <HomePage />;

      case "orders":
        return <OrdersPage />;

      case "info":
        return <InfoPage />;

      default:
        return <HomePage />;
    }
  };

  const currentLabel =
    navItems.find((n) => n.key === selectedPage)?.label ?? "Dashboard";

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      {/* overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:sticky lg:top-[65px] lg:translate-x-0 w-64 shrink-0 h-[calc(100vh-65px)] border-r bg-card z-50 transition-transform duration-300`}
      >
        <div className="flex flex-col h-full p-5">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display text-lg font-bold">Admin Panel</h1>
            <button
              className="lg:hidden text-muted-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedPage(key);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  selectedPage === key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-14 border-b px-4 flex items-center justify-between lg:justify-end gap-3 bg-background/60 backdrop-blur sticky top-[65px] z-30">
          <button
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-md border"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="w-5 h-5" />
          </button>
          <h2 className="font-display text-base font-semibold">
            {currentLabel}
          </h2>
        </div>
        <div className="p-4 sm:p-6">{renderPageContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
