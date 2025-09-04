import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CartData } from "@/context/CartContext";
import { ProductData } from "@/context/ProductContext";
import { UserData } from "@/context/UserContext";
import { categories, server } from "@/main";

import { Edit, Loader, X } from "lucide-react";

const ProductPage = () => {
  const { fetchProduct, product, relatedProduct, loading } = ProductData();
  const { addToCart } = CartData();
  const { isAuth, user } = UserData();
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [updatedImages, setUpdatedImages] = useState(null);

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const addToCartHandler = () => {
    addToCart(id);
  };

  const updateHandler = () => {
    setShow(!show);
    setTitle(product.title);
    setAbout(product.about);
    setStock(product.stock);
    setPrice(product.price);
    setCategory(product.category);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const { data } = await axios.put(
        `${server}/api/product/${id}`,
        { title, about, price, stock, category },
        { headers: { token: Cookies.get("token") } }
      );
      toast.success(data.message);
      fetchProduct(id);
      setShow(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    if (!updatedImages || updatedImages.length === 0) {
      toast.error("Please select new images.");
      setBtnLoading(false);
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < updatedImages.length; i++) {
      formData.append("files", updatedImages[i]);
    }

    try {
      const { data } = await axios.post(`${server}/api/product/${id}`, formData, {
        headers: { token: Cookies.get("token") },
      });
      toast.success(data.message);
      fetchProduct(id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Image upload failed");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Admin Edit Section */}
          {user?.role === "admin" && (
            <div className="w-full max-w-md mx-auto mb-6">
              <Button onClick={updateHandler} className="mb-4">
                {show ? <X /> : <Edit />}
              </Button>

              {show && (
                <form onSubmit={submitHandler} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      placeholder="Product Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label>About</Label>
                    <Input
                      placeholder="About Product"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full p-2 border rounded-md"
                    >
                      {categories.map((cat) => (
                        <option value={cat} key={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      placeholder="Product Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label>Stock</Label>
                    <Input
                      type="number"
                      placeholder="Product Stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={btnLoading}>
                    {btnLoading ? <Loader className="animate-spin" /> : "Update Product"}
                  </Button>
                </form>
              )}
            </div>
          )}

          {/* Product Info & Carousel */}
          {product && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Carousel & Admin Upload */}
              <div className="w-full lg:w-1/2">
                <Carousel>
                  <CarouselContent>
                    {product.images?.map((image, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={image.url}
                          alt={`Product Image ${index + 1}`}
                          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-md"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                {/* Admin Image Upload */}
                {user?.role === "admin" && (
                  <form onSubmit={handleSubmitImage} className="mt-4 space-y-4">
                    <Label htmlFor="files">Upload New Images</Label>
                    <input
                      type="file"
                      name="files"
                      id="files"
                      multiple
                      accept="image/*"
                      onChange={(e) => setUpdatedImages(e.target.files)}
                      className="block w-full text-sm border p-2 rounded-md"
                    />
                    <Button type="submit" disabled={btnLoading}>
                      {btnLoading ? <Loader className="animate-spin" /> : "Update Images"}
                    </Button>
                  </form>
                )}
              </div>

              {/* Product Details */}
              <div className="w-full lg:w-1/2 space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold">{product.title}</h1>
                <p className="text-gray-700 text-sm sm:text-base">{product.about}</p>
                <p className="text-xl font-semibold text-green-600">₹ {product.price}</p>

                {isAuth ? (
                  <>
                    {product.stock <= 0 ? (
                      <p className="text-red-600 font-medium text-xl">Out of Stock</p>
                    ) : (
                      <Button className="w-full max-w-xs" onClick={addToCartHandler}>
                        Add To Cart
                      </Button>
                    )}
                  </>
                ) : (


                  <p className="text-blue-600 text-sm sm:text-base">
                    Please <Link to="/login" className="underline hover:text-blue-800">login to add items to cart.</Link>
                  </p>

                )}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProduct?.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProduct.map((e) => (
                  <ProductCard key={e._id} product={e} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductPage;
