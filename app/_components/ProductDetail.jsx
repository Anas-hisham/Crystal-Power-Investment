"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import AOS from "aos";
import "aos/dist/aos.css";

export default function ProductDetail({ params, product }) {

  const [user, setUser] = useState(null);
  const [picture, setPicture] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#000000");

  const { addToCart } = useCart();
  const route = useRouter();

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#1E40AF" },
    { name: "Green", value: "#166534" },
    { name: "Gray", value: "#6B7280" },
  ];

  useEffect(() => {
    AOS.init();

    const storedUser = localStorage.getItem("user");
    const storedPicture = localStorage.getItem("picture");

    setUser(storedUser);
    setPicture(storedPicture);
  }, []);

  const handleAddToCart = () => {
    if (user || picture) {
      addToCart({ ...product, size: selectedSize, color: selectedColor });

      Swal.fire({
        title: "Product has been added successfully!",
        icon: "success",
        draggable: true,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      route.push("/login");
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen font-bold text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 py-8 overflow-hidden">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            <li>
              <Link
                href="/products"
                className="text-gray-500 hover:text-gray-700"
              >
                Products
              </Link>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            <li className="text-black font-bold">{product.title}</li>
          </ol>
        </nav>
      </div>

      {/* Product Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20" data-aos="fade-left">
        {/* Product Image */}
        <div className="bg-white p-4 rounded-lg" data-aos="zoom-in">
          <img
            src={product.image}
            alt={product.title}
            className="w-[80%] sm:w-full h-96 object-contain mx-auto"
          />
        </div>

        {/* Product Details */}
        <div data-aos="fade-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          <p className="text-gray-500 mb-6">{product.description}</p>

          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-gray-900 mr-3">
              ${product.price}
            </span>
            {product.price > 50 && (
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                Free Shipping
              </span>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-6" data-aos="fade-left">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 flex justify-center items-center px-4 py-2 
                    bg-white shadow text-black rounded-full text-sm font-medium transition-colors
                    ${selectedSize === size && "text-red-500 border border-red-500"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6" data-aos="fade-left">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
            <div className="flex items-center gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                    ${color.value === "#FFFFFF" ? "border border-gray-300" : ""}
                    ${
                      selectedColor === color.value
                        ? "ring-2 ring-offset-1 ring-gray-500"
                        : "hover:ring-1 hover:ring-gray-300"
                    }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="w-full" data-aos="fade-left" data-aos-offset="50">
            <button
              onClick={handleAddToCart}
              className="w-[63%] sm:w-[55%] bg-red-400 text-white py-3 px-4 rounded-md font-medium hover:bg-red-500 transition-colors mb-8"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
