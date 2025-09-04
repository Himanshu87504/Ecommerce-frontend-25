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
        className={`px-3 py-1 rounded-md border ${page === 1
          ? "border-gray-300 text-gray-400 cursor-not-allowed"
          : "border-blue-600 text-blue-600 hover:bg-blue-100"
          }`}
        aria-label="Previous page"
      >
        Prev
      </button>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded-md border ${page === totalPages
          ? "border-gray-300 text-gray-400 cursor-not-allowed"
          : "border-blue-600 text-blue-600 hover:bg-blue-100"
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
        className={`fixed inset-y-0 left-0 z-50 md:z-40 w-4/5 max-w-xs md:w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4 relative h-full overflow-y-auto">
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full p-2 md:hidden"
          >
            <X />
          </button>
          <h2 className="text-lg font-bold mb-4">Filters</h2>

          {/* Search */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Search Title</label>
            <Input
              type="text"
              placeholder="Search Title"
              className="w-full p-2 border rounded-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price</label>
            <select
              className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Select</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          {/* Clear Filters */}
          <Button className="mt-2 w-full" onClick={clearFilter}>
            Clear Filter
          </Button>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1 p-4">
        {/* Toggle Filter on Small Screens */}
        <button
          onClick={() => setShow(true)}
          className="md:hidden bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          <Filter className="inline mr-2" /> Filters
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
