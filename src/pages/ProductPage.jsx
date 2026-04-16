// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// import Loading from "@/components/Loading";
// import ProductCard from "@/components/ProductCard";
// import { Button } from "@/components/ui/button";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import { CartData } from "@/context/CartContext";
// import { ProductData } from "@/context/ProductContext";
// import { UserData } from "@/context/UserContext";
// import { categories, server } from "@/main";

// import { Edit, Loader, X } from "lucide-react";

// const ProductPage = () => {
//   const { fetchProduct, product, relatedProduct, loading } = ProductData();
//   const { addToCart } = CartData();
//   const { isAuth, user } = UserData();
//   const { id } = useParams();

//   const [show, setShow] = useState(false);
//   const [title, setTitle] = useState("");
//   const [about, setAbout] = useState("");
//   const [stock, setStock] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [updatedImages, setUpdatedImages] = useState(null);

//   useEffect(() => {
//     fetchProduct(id);
//   }, [id]);

//   const addToCartHandler = () => {
//     addToCart(id);
//   };

//   const updateHandler = () => {
//     setShow(!show);
//     setTitle(product.title);
//     setAbout(product.about);
//     setStock(product.stock);
//     setPrice(product.price);
//     setCategory(product.category);
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);

//     try {
//       const { data } = await axios.put(
//         `${server}/api/product/${id}`,
//         { title, about, price, stock, category },
//         { headers: { token: Cookies.get("token") } }
//       );
//       toast.success(data.message);
//       fetchProduct(id);
//       setShow(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Update failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const handleSubmitImage = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);

//     if (!updatedImages || updatedImages.length === 0) {
//       toast.error("Please select new images.");
//       setBtnLoading(false);
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < updatedImages.length; i++) {
//       formData.append("files", updatedImages[i]);
//     }

//     try {
//       const { data } = await axios.post(`${server}/api/product/${id}`, formData, {
//         headers: { token: Cookies.get("token") },
//       });
//       toast.success(data.message);
//       fetchProduct(id);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Image upload failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           {/* Admin Edit Section */}
//           {user?.role === "admin" && (
//             <div className="w-full max-w-md mx-auto mb-6">
//               <Button onClick={updateHandler} className="mb-4">
//                 {show ? <X /> : <Edit />}
//               </Button>

//               {show && (
//                 <form onSubmit={submitHandler} className="space-y-4">
//                   <div>
//                     <Label>Title</Label>
//                     <Input
//                       placeholder="Product Title"
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <Label>About</Label>
//                     <Input
//                       placeholder="About Product"
//                       value={about}
//                       onChange={(e) => setAbout(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <Label>Category</Label>
//                     <select
//                       value={category}
//                       onChange={(e) => setCategory(e.target.value)}
//                       required
//                       className="w-full p-2 border rounded-md"
//                     >
//                       {categories.map((cat) => (
//                         <option value={cat} key={cat}>
//                           {cat}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <Label>Price</Label>
//                     <Input
//                       type="number"
//                       placeholder="Product Price"
//                       value={price}
//                       onChange={(e) => setPrice(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <Label>Stock</Label>
//                     <Input
//                       type="number"
//                       placeholder="Product Stock"
//                       value={stock}
//                       onChange={(e) => setStock(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <Button type="submit" className="w-full" disabled={btnLoading}>
//                     {btnLoading ? <Loader className="animate-spin" /> : "Update Product"}
//                   </Button>
//                 </form>
//               )}
//             </div>
//           )}

//           {/* Product Info & Carousel */}
//           {product && (
//             <div className="flex flex-col lg:flex-row gap-8">
//               {/* Carousel & Admin Upload */}
//               <div className="w-full lg:w-1/2">
//                 <Carousel>
//                   <CarouselContent>
//                     {product.images?.map((image, index) => (
//                       <CarouselItem key={index}>
//                         <img
//                           src={image.url}
//                           alt={`Product Image ${index + 1}`}
//                           className="w-full h-64 sm:h-80 md:h-96  rounded-md"
//                         />
//                       </CarouselItem>
//                     ))}
//                   </CarouselContent>
//                   <CarouselPrevious />
//                   <CarouselNext />
//                 </Carousel>

//                 {/* Admin Image Upload */}
//                 {user?.role === "admin" && (
//                   <form onSubmit={handleSubmitImage} className="mt-4 space-y-4">
//                     <Label htmlFor="files">Upload New Images</Label>
//                     <input
//                       type="file"
//                       name="files"
//                       id="files"
//                       multiple
//                       accept="image/*"
//                       onChange={(e) => setUpdatedImages(e.target.files)}
//                       className="block w-full text-sm border p-2 rounded-md"
//                     />
//                     <Button type="submit" disabled={btnLoading}>
//                       {btnLoading ? <Loader className="animate-spin" /> : "Update Images"}
//                     </Button>
//                   </form>
//                 )}
//               </div>

//               {/* Product Details */}
//               {/* <div className="w-full lg:w-1/2 space-y-4 ">
//                 <h1 className="text-2xl sm:text-4xl font-bold flex justify-center ">{product.title}</h1>
//                 <p className="text-gray-700 text-sm sm:text-base">{product.about}</p>
//                 <p className="text-xl font-semibold text-green-600">₹ {product.price}</p>

//                 {isAuth ? (
//                   <>
//                     {product.stock <= 0 ? (
//                       <p className="text-red-600 font-medium text-xl">Out of Stock</p>
//                     ) : (
//                       <Button className="w-full max-w-xs" onClick={addToCartHandler}>
//                         Add To Cart
//                       </Button>
//                     )}
//                   </>
//                 ) : (


//                   <p className="text-blue-600 text-sm sm:text-base">
//                     Please <Link to="/login" className="underline hover:text-blue-800">login to add items to cart.</Link>
//                   </p>

//                 )}
//               </div> */}
//               <div className="w-full lg:w-1/2 flex flex-col gap-4">

//                 {/* Title + Description */}
//                 <div>
//                   <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">{product.title}</h1>
//                   <p className="mt-2 text-sm sm:text-base text-gray-500 leading-relaxed">{product.about}</p>
//                 </div>

//                 {/* Price + Stock Badge */}
//                 <div className="flex items-center justify-between border-t border-gray-100 pt-4">
//                   <div>
//                     <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Price</p>
//                     <p className="text-2xl font-semibold text-green-600">₹ {product.price}</p>
//                   </div>
//                   {product.stock <= 0 ? (
//                     <span className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-md">Out of Stock</span>
//                   ) : (
//                     <span className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-md">In Stock</span>
//                   )}
//                 </div>

//                 {/* Action Area */}
//                 {isAuth ? (
//                   product.stock <= 0 ? (
//                     <button disabled className="w-full max-w-xs py-3 bg-gray-100 text-gray-400 rounded-md text-sm cursor-not-allowed border border-gray-200">
//                       Out of Stock
//                     </button>
//                   ) : (
//                     <button
//                       onClick={addToCartHandler}
//                       className="w-full max-w-xs py-3 bg-gray-900 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-all"
//                     >
//                       Add to Cart
//                     </button>
//                   )
//                 ) : (
//                   <p className="text-sm text-gray-400 text-center">
//                     Not logged in?{" "}
//                     <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
//                       Login to add items to cart
//                     </Link>
//                   </p>
//                 )}

//               </div>
//             </div>
//           )}

//           {/* Related Products */}
//           {relatedProduct?.length > 0 && (
//             <div className="mt-12">
//               <h2 className="text-xl font-bold mb-4">Related Products</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {relatedProduct.map((e) => (
//                   <ProductCard key={e._id} product={e} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ProductPage;


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Edit, Loader, X } from "lucide-react";

import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CartData } from "@/context/CartContext";
import { ProductData } from "@/context/ProductContext";
import { UserData } from "@/context/UserContext";
import { categories, server } from "@/main";

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

  useEffect(() => { fetchProduct(id); }, [id]);

  const addToCartHandler = () => addToCart(id);

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
    for (let i = 0; i < updatedImages.length; i++) formData.append("files", updatedImages[i]);
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
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {loading ? <Loading /> : (
        <>
          {/* ── Admin Edit Panel ── */}
          {user?.role === "admin" && (
            <div className="w-full max-w-lg mx-auto mb-8">
              <button
                onClick={updateHandler}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-all mb-4"
              >
                {show ? <X size={16} /> : <Edit size={16} />}
                {show ? "Cancel" : "Edit Product"}
              </button>

              {show && (
                <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
                  <p className="text-sm font-medium text-gray-700 border-b border-gray-100 pb-3">
                    Update product details
                  </p>

                  <form onSubmit={submitHandler} className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-500 uppercase tracking-wide">Title</Label>
                      <Input placeholder="Product title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-500 uppercase tracking-wide">About</Label>
                      <Input placeholder="Product description" value={about} onChange={(e) => setAbout(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-500 uppercase tracking-wide">Category</Label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                      >
                        {categories.map((cat) => (
                          <option value={cat} key={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-500 uppercase tracking-wide">Price</Label>
                        <Input type="number" placeholder="₹ Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-gray-500 uppercase tracking-wide">Stock</Label>
                        <Input type="number" placeholder="Qty" value={stock} onChange={(e) => setStock(e.target.value)} required />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={btnLoading}
                      className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-all disabled:opacity-50"
                    >
                      {btnLoading ? <Loader className="animate-spin mx-auto" size={16} /> : "Update Product"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ── Product Detail ── */}
          {product && (
            <div className="flex flex-col lg:flex-row gap-10">

              {/* Left — Carousel */}
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                  <Carousel>
                    <CarouselContent>
                      {product.images?.map((image, index) => (
                        <CarouselItem key={index}>
                          <img
                            src={image.url}
                            alt={`Product ${index + 1}`}
                            className="w-full h-64 sm:h-80 md:h-96 object-cover"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>

                {/* Admin Image Upload */}
                {user?.role === "admin" && (
                  <form onSubmit={handleSubmitImage} className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Upload new images</p>
                    <input
                      type="file"
                      name="files"
                      id="files"
                      multiple
                      accept="image/*"
                      onChange={(e) => setUpdatedImages(e.target.files)}
                      className="block w-full text-sm text-gray-500 border border-gray-200 rounded-xl p-2 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:text-sm"
                    />
                    <button
                      type="submit"
                      disabled={btnLoading}
                      className="w-full py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                      {btnLoading ? <Loader className="animate-spin mx-auto" size={16} /> : "Update Images"}
                    </button>
                  </form>
                )}
              </div>

              {/* Right — Product Info */}
              <div className="w-full lg:w-1/2 flex flex-col border border-gray-100 rounded-2xl overflow-hidden bg-white">

                {/* Title + Description */}
                <div className="px-6 py-5 border-b border-gray-100">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">{product.title}</h1>
                  <p className="text-sm text-gray-500 leading-relaxed">{product.about}</p>
                </div>

                {/* Price + Stock */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">Price</p>
                    <p className="text-2xl font-semibold text-green-600">₹ {product.price}</p>
                  </div>
                  {product.stock <= 0 ? (
                    <span className="bg-red-50 text-red-500 text-xs px-3 py-1.5 rounded-full font-medium">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="bg-green-50 text-green-600 text-xs px-3 py-1.5 rounded-full font-medium">
                      In Stock
                    </span>
                  )}
                </div>

                {/* Stock count */}
                {product.stock > 0 && (
                  <div className="px-6 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-400">
                      <span className="text-gray-700 font-medium">{product.stock}</span> units available
                    </p>
                  </div>
                )}

                {/* Action */}
                <div className="px-6 py-5 flex flex-col gap-3 mt-auto">
                  {isAuth ? (
                    product.stock <= 0 ? (
                      <button
                        disabled
                        className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl text-sm cursor-not-allowed border border-gray-200"
                      >
                        Out of Stock
                      </button>
                    ) : (
                      <button
                        onClick={addToCartHandler}
                        className="w-full py-3 bg-gray-900 hover:bg-gray-700 active:scale-[0.98] text-white rounded-xl text-sm font-medium transition-all tracking-wide"
                      >
                        Add to Cart
                      </button>
                    )
                  ) : (
                    <p className="text-sm text-gray-400 text-center">
                      Not logged in?{" "}
                      <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
                        Login to purchase
                      </Link>
                    </p>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ── Related Products ── */}
          {relatedProduct?.length > 0 && (
            <div className="mt-14 pt-8 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Related products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
