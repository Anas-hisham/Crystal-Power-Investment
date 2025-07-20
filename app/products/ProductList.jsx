"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProductList({ initialProducts }) {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    sort: "", // "asc", "desc", "popularity"
  });

  const categories = ["Men's Clothing", "Women's Clothing"];
  const ratings = [5, 4, 3, 2, 1];

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const updatedProducts = initialProducts.map((p) => ({
      ...p,
      liked: false,
    }));
    setProducts(updatedProducts);
  }, [initialProducts]);

  const toggleLike = (id) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, liked: !p.liked } : p
    );
    setProducts(updatedProducts);
  };

  const filtered = products
    .filter((p) =>
      filters.search
        ? p.title.toLowerCase().includes(filters.search.toLowerCase())
        : true
    )
    .filter((p) =>
      filters.category
        ? p.category.toLowerCase() === filters.category.toLowerCase()
        : true
    )
    .filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice)
    .filter((p) => p.rating?.rate >= filters.minRating)
    .sort((a, b) => {
      if (filters.sort === "asc") return a.price - b.price;
      if (filters.sort === "desc") return b.price - a.price;
      if (filters.sort === "popularity")
        return b.rating?.count - a.rating?.count;
      return 0;
    });

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-6 gap-10 overflow-hidden">
      {/* Sidebar Filters */}
      <div
        data-aos="fade-right"
        className=" h-fit lg:w-1/4 w-full bg-white rounded-2xl p-6 shadow-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-gray-700">Filters</h2>

        {/* Search */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">Search</label>
          <input
            type="text"
            placeholder="Search for products"
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">Category</label>
          <select
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: Number(e.target.value) })
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">Minimum Rating</label>
          <div className="flex flex-col gap-2">
            {ratings.map((rate) => (
              <label
                key={rate}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  value={rate}
                  checked={filters.minRating === rate}
                  onChange={() => setFilters({ ...filters, minRating: rate })}
                />
                <span className="flex items-center gap-1 text-yellow-500">
                  {Array(rate)
                    .fill(0)
                    .map((_, idx) => (
                      <IoIosStar key={idx} />
                    ))}
                </span>
              </label>
            ))}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value="0"
                checked={filters.minRating === 0}
                onChange={() => setFilters({ ...filters, minRating: 0 })}
              />
              <span className="text-gray-500">Any Rating</span>
            </label>
          </div>
        </div>

        {/* Sort */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">Sort By</label>
          <select
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() =>
            setFilters({
              search: "",
              category: "",
              minPrice: 0,
              maxPrice: 1000,
              minRating: 0,
              sort: "",
            })
          }
          className="mt-4 p-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition"
        >
          Reset Filters
        </button>
      </div>

      {/* Products Grid */}
      <div
        data-aos="fade-left"
        className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-fit"
      >
        {filtered.length > 0 ? (
          filtered.map(
            (p) =>
              (p.category.toLowerCase() === "men's clothing" ||
                p.category.toLowerCase() === "women's clothing") && (
                <div
                  key={p.id}
                  className="relative  bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col"
                  data-aos="fade-up"
                  data-aos-offset="100"
                >
                  {/* Like button */}
                  <button
                    onClick={() => toggleLike(p.id)}
                    className="z-50 absolute top-4 right-4 bg-white shadow w-9 h-9 rounded-full flex justify-center items-center hover:scale-110 transition"
                  >
                    {p.liked ? (
                      <FaHeart className="text-red-400" />
                    ) : (
                      <FaRegHeart className="text-red-400" />
                    )}
                  </button>

                  {/* Product Image */}
                  <Link href={`/products/${p.id}`} className="w-full">
                    <div className="h-70 w-full flex justify-center items-center">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-60 object-cover rounded-xl mb-4 hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>

                  {/* Title */}
                  <h3 className="text-md font-semibold text-gray-800 line-clamp-2 mb-2">
                    {p.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2 text-yellow-500 text-sm">
                    {Array(Math.round(p.rating?.rate || 0))
                      .fill(0)
                      .map((_, idx) => (
                        <IoIosStar key={idx} />
                      ))}
                  </div>

                  {/* Price */}
                  <p className="text-lg font-bold text-red-400">${p.price}</p>
                </div>
              )
          )
        ) : (
          <p className="text-gray-600 text-center col-span-full mt-10">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
