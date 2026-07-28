import React, { useState } from "react";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, X } from "lucide-react";
import { ProductData } from "@/context/ProductContext";

const PaginationControls = ({ page, totalPages, setPage }) => {
  const prevPage = () => page > 1 && setPage(page - 1);
  const nextPage = () => page < totalPages && setPage(page + 1);

  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex justify-center items-center space-x-2 mt-6 mb-3"
    >
      <button
        onClick={prevPage}
        disabled={page === 1}
        className={`px-3 py-1 rounded-full border transition-colors ${page === 1
          ? "border-border text-muted-foreground cursor-not-allowed"
          : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
        aria-label="Previous page"
      >
        Prev
      </button>
      <span className="text-sm font-medium text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded-full border transition-colors ${page === totalPages
          ? "border-border text-muted-foreground cursor-not-allowed"
          : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

const Products = () => {
  const [show, setShow] = useState(false);
  const {
    search,
    setSearch,
    categories,
    category,
    setCategory,
    totalPages,
    price,
    setPrice,
    page,
    setPage,
    products,
    loading,
  } = ProductData();

  const clearFilter = () => {
    setPrice("");
    setCategory("");
    setSearch("");
    setPage(1);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar Filters */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:z-40 w-4/5 max-w-xs md:w-64 bg-card border-r shadow-lg md:shadow-none transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-5 relative h-full overflow-y-auto">
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 bg-secondary text-foreground rounded-full p-2 md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
          <h2 className="font-display text-lg font-bold mb-5">Filters</h2>

          {/* Search */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Search Title</label>
            <Input
              type="text"
              placeholder="Search Title"
              className="w-full rounded-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              className="w-full p-2 border rounded-md bg-background text-foreground"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Price</label>
            <select
              className="w-full p-2 border rounded-md bg-background text-foreground"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Select</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          {/* Clear Filters */}
          <Button variant="outline" className="mt-2 w-full" onClick={clearFilter}>
            Clear Filter
          </Button>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1 p-4 sm:p-6">
        {/* Toggle Filter on Small Screens */}
        <button
          onClick={() => setShow(true)}
          className="md:hidden flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-full mb-4 text-sm font-medium"
        >
          <Filter className="inline mr-2 h-4 w-4" /> Filters
        </button>

        {/* Responsive Product Grid with uniform gap */}
        {loading ? (
          <Loading />
        ) : (
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} latest="no" />
              ))
            ) : (
              <p className="text-center col-span-full">No Products Yet</p>
            )}
          </div>

        )}

        {/* Pagination Controls */}
        <PaginationControls page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
};

export default Products;
