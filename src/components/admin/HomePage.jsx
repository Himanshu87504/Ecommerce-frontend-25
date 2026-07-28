import { ProductData } from "@/context/ProductContext";
import React, { useState } from "react";
import Loading from "../Loading";
import ProductCard from "../ProductCard";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { categories, server } from "@/main";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { ImagePlus, Package, Plus } from "lucide-react";

const emptyForm = {
  title: "",
  about: "",
  category: "",
  price: "",
  stock: "",
  images: null,
};

const HomePage = () => {
  const { products, page, setPage, fetchProducts, loading, totalPages } =
    ProductData();

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFromData] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFromData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFromData((prev) => ({ ...prev, images: e.target.files }));
  };

  const submitHanlder = async (e) => {
    e.preventDefault();

    // guard against double-submit (double click / double enter)
    if (submitting) return;

    if (!formData.images || formData.images.length === 0) {
      toast.error("Please select images");
      return;
    }

    const myFrom = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        for (let i = 0; i < value.length; i++) {
          myFrom.append("files", value[i]);
        }
      } else {
        myFrom.append(key, value);
      }
    });

    setSubmitting(true);

    try {
      const { data } = await axios.post(`${server}/api/product/new`, myFrom, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: Cookies.get("token"),
        },
      });

      toast.success(data.message);
      setOpen(false);
      setFromData(emptyForm);
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            Catalog
          </p>
          <h2 className="font-display text-2xl font-bold">All Products</h2>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="rounded-full gap-2"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Button>

        <Dialog
          open={open}
          onOpenChange={(next) => {
            if (!submitting) setOpen(next);
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Product</DialogTitle>
            </DialogHeader>

            <form onSubmit={submitHanlder} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Title</label>
                <Input
                  name="title"
                  placeholder="e.g. iPhone 17 Pro"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">About</label>
                <Input
                  name="about"
                  placeholder="Short description"
                  value={formData.about}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm capitalize ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select</option>
                    {categories.map((e) => (
                      <option value={e} key={e} className="capitalize">
                        {e}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Stock</label>
                  <Input
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Price (₹)</label>
                <Input
                  name="price"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <ImagePlus className="h-4 w-4" /> Product Images
                </label>
                <Input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Creating…" : "Create Product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products && products.length > 0 ? (
            products.map((e) => {
              return <ProductCard product={e} key={e._id} latest={"no"} />;
            })
          ) : (
            <div className="col-span-full flex flex-col items-center gap-3 py-16 text-muted-foreground">
              <Package className="h-10 w-10" />
              <p>No products yet — add your first one.</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 mb-3 flex items-center justify-center gap-3">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`px-3 py-1 rounded-full border text-sm transition-colors ${
            page === 1
              ? "border-border text-muted-foreground cursor-not-allowed"
              : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          Prev
        </button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded-full border text-sm transition-colors ${
            page === totalPages
              ? "border-border text-muted-foreground cursor-not-allowed"
              : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
