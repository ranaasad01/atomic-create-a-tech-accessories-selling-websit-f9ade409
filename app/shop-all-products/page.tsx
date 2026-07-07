"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { products, categories } from "@/lib/data";
import { Search, SlidersHorizontal, Star, ShoppingCart, Heart, ChevronDown, X, Check, Grid, List, ArrowUpDown, Zap, Shield, Headphones, HardDrive } from 'lucide-react';
import { useTranslations } from "next-intl";

const allProducts = [
  {
    id: "1",
    name: "MagSafe Braided USB-C Cable 2m",
    slug: "magsafe-braided-usb-c-cable-2m",
    category: "cables",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviewCount: 312,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MPL43?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1698168621764",
    badge: "Best Seller",
    inStock: true,
    description: "Premium braided USB-C cable with 240W fast charging support and 10Gbps data transfer.",
  },
  {
    id: "2",
    name: "GaN 100W USB-C Charger",
    slug: "gan-100w-usb-c-charger",
    category: "chargers",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviewCount: 487,
    image: "https://m.media-amazon.com/images/I/516szWmX2ZL._AC_UF894,1000_QL80_.jpg",
    badge: "Top Rated",
    inStock: true,
    description: "Ultra-compact GaN charger with 100W output. Charge your laptop, tablet, and phone simultaneously.",
  },
  {
    id: "3",
    name: "AirPods Pro Silicone Case",
    slug: "airpods-pro-silicone-case",
    category: "cases",
    price: 19.99,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 203,
    image: "http://www.elago.com/cdn/shop/products/APP2SC-HANG-LV.jpg?v=1665596426",
    badge: "New",
    inStock: true,
    description: "Military-grade drop protection meets sleek design. Liquid silicone exterior with microfiber lining.",
  },
  {
    id: "4",
    name: "Studio-Grade Wireless Headphones",
    slug: "studio-grade-wireless-headphones",
    category: "audio",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 156,
    image: "https://m.media-amazon.com/images/I/51N2OJQ8ggL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale",
    inStock: true,
    description: "40-hour battery life, active noise cancellation, and studio-quality sound in a premium build.",
  },
  {
    id: "5",
    name: "Mechanical Gaming Keyboard",
    slug: "mechanical-gaming-keyboard",
    category: "peripherals",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 274,
    image: "https://m.media-amazon.com/images/I/71T1WQSxp9L.jpg",
    badge: "Popular",
    inStock: true,
    description: "Tactile mechanical switches with per-key RGB lighting and aluminum frame construction.",
  },
  {
    id: "6",
    name: "1TB NVMe Portable SSD",
    slug: "1tb-nvme-portable-ssd",
    category: "storage",
    price: 109.99,
    originalPrice: 139.99,
    rating: 4.9,
    reviewCount: 389,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6577/6577442_rd.jpg;maxHeight=828;maxWidth=400?format=webp",
    badge: "Best Seller",
    inStock: true,
    description: "Read speeds up to 2000MB/s in a pocket-sized, drop-resistant enclosure. USB-C 3.2 Gen 2.",
  },
  {
    id: "7",
    name: "Wireless Charging Pad 15W",
    slug: "wireless-charging-pad-15w",
    category: "chargers",
    price: 34.99,
    originalPrice: undefined,
    rating: 4.5,
    reviewCount: 128,
    image: "/images/wireless-charging-pad-white.jpg",
    badge: undefined,
    inStock: true,
    description: "Qi2-certified 15W wireless charging pad compatible with all Qi-enabled devices.",
  },
  {
    id: "8",
    name: "Slim Laptop Sleeve 14-inch",
    slug: "slim-laptop-sleeve-14-inch",
    category: "cases",
    price: 39.99,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 91,
    image: "/images/slim-laptop-sleeve-gray.jpg",
    badge: "New",
    inStock: true,
    description: "Water-resistant neoprene sleeve with accessory pocket. Fits 13-14 inch laptops perfectly.",
  },
  {
    id: "9",
    name: "USB-C Hub 7-in-1",
    slug: "usb-c-hub-7-in-1",
    category: "peripherals",
    price: 49.99,
    originalPrice: 64.99,
    rating: 4.7,
    reviewCount: 342,
    image: "/images/usb-c-hub-7-in-1-silver.jpg",
    badge: "Sale",
    inStock: true,
    description: "Expand your laptop with HDMI 4K, 3x USB-A, SD card, microSD, and 100W PD pass-through.",
  },
  {
    id: "10",
    name: "Braided Lightning Cable 1m",
    slug: "braided-lightning-cable-1m",
    category: "cables",
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.5,
    reviewCount: 215,
    image: "/images/braided-lightning-cable-black.jpg",
    badge: undefined,
    inStock: true,
    description: "MFi-certified braided lightning cable with 20W fast charging support for iPhone and iPad.",
  },
  {
    id: "11",
    name: "True Wireless Earbuds Pro",
    slug: "true-wireless-earbuds-pro",
    category: "audio",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 198,
    image: "https://s7d1.scene7.com/is/image/tracfone/Pro4%20Ear%20Buds?scl=1&fmt=webp-alpha&qlt=80,0&resMode=sharp2&op_usm=1.75,0.3,2,0",
    badge: "Sale",
    inStock: true,
    description: "Hybrid ANC, 8-hour battery with 32-hour case, IPX5 water resistance, and custom EQ app.",
  },
  {
    id: "12",
    name: "256GB USB-C Flash Drive",
    slug: "256gb-usb-c-flash-drive",
    category: "storage",
    price: 44.99,
    originalPrice: undefined,
    rating: 4.4,
    reviewCount: 76,
    image: "/images/usb-c-flash-drive-256gb.jpg",
    badge: undefined,
    inStock: false,
    description: "Dual USB-C and USB-A connector with 400MB/s read speed. Compact keychain-friendly design.",
  },
  {
    id: "13",
    name: "Ergonomic Wireless Mouse",
    slug: "ergonomic-wireless-mouse",
    category: "peripherals",
    price: 54.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviewCount: 163,
    image: "http://manhattanproducts.us/cdn/shop/products/wireless-ergonomic-mouse-with-2-in-1-usb-receiver-190237-1.jpg?v=1695233143",
    badge: "Popular",
    inStock: true,
    description: "Sculpted ergonomic form with silent clicks, 4000 DPI sensor, and 90-day battery life.",
  },
  {
    id: "14",
    name: "iPhone 15 Pro MagSafe Case",
    slug: "iphone-15-pro-magsafe-case",
    category: "cases",
    price: 29.99,
    originalPrice: undefined,
    rating: 4.7,
    reviewCount: 441,
    image: "/images/iphone-15-pro-magsafe-case-clear.jpg",
    badge: "New",
    inStock: true,
    description: "Crystal-clear MagSafe-compatible case with military-grade corner protection and anti-yellow coating.",
  },
  {
    id: "15",
    name: "65W GaN Travel Charger",
    slug: "65w-gan-travel-charger",
    category: "chargers",
    price: 44.99,
    originalPrice: 54.99,
    rating: 4.8,
    reviewCount: 229,
    image: "/images/65w-gan-travel-charger-white.jpg",
    badge: "Best Seller",
    inStock: true,
    description: "Foldable plug, dual USB-C ports, universal voltage support. Perfect for international travel.",
  },
  {
    id: "16",
    name: "Magnetic Cable Organizer Set",
    slug: "magnetic-cable-organizer-set",
    category: "cables",
    price: 14.99,
    originalPrice: undefined,
    rating: 4.3,
    reviewCount: 88,
    image: "/images/magnetic-cable-organizer-set.jpg",
    badge: undefined,
    inStock: true,
    description: "Set of 10 magnetic cable clips in two sizes. Keep your desk tidy and cables always reachable.",
  },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 to $50", min: 25, max: 50 },
  { label: "$50 to $100", min: 50, max: 100 },
  { label: "Over $100", min: 100, max: Infinity },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-700 text-slate-700"
          }`}
        />
      ))}
    </div>
  );
}

function BadgePill({ badge }: { badge: string }) {
  const colorMap: Record<string, string> = {
    "Best Seller": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "Top Rated": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    New: "bg-[#6366F1]/20 text-[#818CF8] border-[#6366F1]/30",
    Sale: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    Popular: "bg-[#22D3EE]/20 text-[#22D3EE] border-[#22D3EE]/30",
  };
  const cls = colorMap[badge] ?? "bg-slate-700/50 text-slate-300 border-slate-600/30";
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cls}`}>
      {badge}
    </span>
  );
}

export default function ShopAllProductsPage() {
  const t = useTranslations();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (id: string) => {
    setAddedToCart((prev) => [...prev, id]);
    setTimeout(() => {
      setAddedToCart((prev) => prev.filter((x) => x !== id));
    }, 1800);
  };

  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      if (range) {
        list = list.filter(
          (p) => p.price >= range.min && p.price < range.max
        );
      }
    }

    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    switch (selectedSort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        break;
    }

    return list;
  }, [search, selectedCategory, selectedPriceRange, inStockOnly, selectedSort]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedPriceRange(null);
    setInStockOnly(false);
    setSelectedSort("featured");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedPriceRange !== null ||
    inStockOnly;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Page Header */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative pt-28 pb-12 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#6366F1]/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-[#22D3EE]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">All Products</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              All Products
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Browse our full catalog of premium tech accessories, curated for every setup and lifestyle.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Search + Controls Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6366F1]/60 focus:bg-white/8 transition-all duration-200"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200 sm:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
            )}
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200 min-w-[160px] justify-between"
            >
              <span className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                {sortOptions.find((s) => s.value === selectedSort)?.label ?? "Sort"}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-2 w-52 bg-[#1E293B] border border-white/10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-30 overflow-hidden"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSelectedSort(opt.value); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors duration-150 ${
                        selectedSort === opt.value
                          ? "text-white bg-[#6366F1]/20"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {opt.label}
                      {selectedSort === opt.value && <Check className="w-4 h-4 text-[#6366F1]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View mode */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "grid" ? "bg-[#6366F1] text-white" : "text-slate-400 hover:text-white"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all duration-200 ${viewMode === "list" ? "bg-[#6366F1] text-white" : "text-slate-400 hover:text-white"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <motion.aside
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="hidden sm:block w-56 flex-shrink-0"
          >
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Category
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center justify-between ${
                      selectedCategory === "all"
                        ? "bg-[#6366F1]/20 text-white border border-[#6366F1]/30"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-xs text-slate-500">{allProducts.length}</span>
                  </button>
                  {categories.map((cat) => {
                    const count = allProducts.filter((p) => p.category === cat.slug).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center justify-between ${
                          selectedCategory === cat.slug
                            ? "bg-[#6366F1]/20 text-white border border-[#6366F1]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-slate-500">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Price Range
                </h3>
                <div className="space-y-1">
                  {priceRanges.map((range, idx) => (
                    <button
                      key={range.label}
                      onClick={() =>
                        setSelectedPriceRange(selectedPriceRange === idx ? null : idx)
                      }
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedPriceRange === idx
                          ? "bg-[#6366F1]/20 text-white border border-[#6366F1]/30"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Availability
                </h3>
                <button
                  onClick={() => setInStockOnly((v) => !v)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 w-full ${
                    inStockOnly
                      ? "bg-[#6366F1]/20 text-white border border-[#6366F1]/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      inStockOnly ? "bg-[#6366F1] border-[#6366F1]" : "border-slate-600"
                    }`}
                  >
                    {inStockOnly && <Check className="w-3 h-3 text-white" />}
                  </div>
                  In Stock Only
                </button>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-[#22D3EE] hover:text-white transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.aside>

          {/* Mobile Filters Panel */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="sm:hidden w-full mb-4 overflow-hidden"
              >
                <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-5 space-y-5">
                  {/* Categories */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                          selectedCategory === "all"
                            ? "bg-[#6366F1] border-[#6366F1] text-white"
                            : "border-white/10 text-slate-400 hover:text-white"
                        }`}
                      >
                        All
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.slug)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                            selectedCategory === cat.slug
                              ? "bg-[#6366F1] border-[#6366F1] text-white"
                              : "border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Price */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Price</h3>
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map((range, idx) => (
                        <button
                          key={range.label}
                          onClick={() => setSelectedPriceRange(selectedPriceRange === idx ? null : idx)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                            selectedPriceRange === idx
                              ? "bg-[#6366F1] border-[#6366F1] text-white"
                              : "border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setInStockOnly((v) => !v)}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${inStockOnly ? "bg-[#6366F1] border-[#6366F1]" : "border-slate-600"}`}>
                        {inStockOnly && <Check className="w-3 h-3 text-white" />}
                      </div>
                      In Stock Only
                    </button>
                    {hasActiveFilters && (
                      <button onClick={clearFilters} className="text-xs text-[#22D3EE]">Clear all</button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid / List */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-400">
                Showing <span className="text-white font-medium">{filtered.length}</span> of{" "}
                <span className="text-white font-medium">{allProducts.length}</span> products
              </p>
            </div>

            {filtered.length === 0 ? (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-slate-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No products found</h3>
                <p className="text-slate-400 text-sm mb-6 max-w-xs">
                  Try adjusting your search or filters to find what you are looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-[#6366F1] hover:bg-[#5558E3] text-white text-sm font-medium rounded-xl transition-colors duration-200"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div
                key="grid"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((product) => {
                  const inCart = addedToCart.includes(product.id);
                  const inWish = wishlist.includes(product.id);
                  const discount =
                    product.originalPrice
                      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                      : null;

                  return (
                    <motion.div
                      key={product.id}
                      variants={scaleIn}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="group relative bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-[#6366F1]/40 hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)] transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative aspect-square bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/tech-accessory-placeholder.jpg";
                          }}
                        />
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {product.badge && <BadgePill badge={product.badge} />}
                          {discount && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                              -{discount}%
                            </span>
                          )}
                          {!product.inStock && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 border border-slate-600/30">
                              Out of Stock
                            </span>
                          )}
                        </div>
                        {/* Wishlist */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors duration-200 ${
                              inWish ? "fill-rose-400 text-rose-400" : "text-white"
                            }`}
                          />
                        </motion.button>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <p className="text-xs text-slate-500 capitalize mb-1">{product.category}</p>
                        <h3 className="text-sm font-semibold text-white leading-snug mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <StarRating rating={product.rating} />
                          <span className="text-xs text-slate-500">({product.reviewCount})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-bold text-white">
                              ${(product.price ?? 0).toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-slate-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => product.inStock && handleAddToCart(product.id)}
                            disabled={!product.inStock}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                              inCart
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : product.inStock
                                ? "bg-[#6366F1] hover:bg-[#5558E3] text-white"
                                : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                            }`}
                          >
                            {inCart ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                Added
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5" />
                                Add
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                {filtered.map((product) => {
                  const inCart = addedToCart.includes(product.id);
                  const inWish = wishlist.includes(product.id);
                  const discount =
                    product.originalPrice
                      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                      : null;

                  return (
                    <motion.div
                      key={product.id}
                      variants={fadeInUp}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="group flex gap-4 bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-[#6366F1]/40 hover:shadow-[0_4px_24px_rgba(99,102,241,0.12)] transition-all duration-300 p-4"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/tech-accessory-placeholder.jpg";
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-xs text-slate-500 capitalize">{product.category}</p>
                              {product.badge && <BadgePill badge={product.badge} />}
                              {!product.inStock && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 border border-slate-600/30">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-semibold text-white leading-snug mb-1 truncate">
                              {product.name}
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-2">
                              {product.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <StarRating rating={product.rating} />
                              <span className="text-xs text-slate-500">({product.reviewCount})</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3 flex-shrink-0">
                            <div className="text-right">
                              <div className="text-base font-bold text-white">
                                ${(product.price ?? 0).toFixed(2)}
                              </div>
                              {product.originalPrice && (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs text-slate-500 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                  </span>
                                  {discount && (
                                    <span className="text-[10px] font-bold text-rose-400">-{discount}%</span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleWishlist(product.id)}
                                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-rose-500/30 transition-all duration-200"
                              >
                                <Heart
                                  className={`w-4 h-4 ${inWish ? "fill-rose-400 text-rose-400" : "text-slate-400"}`}
                                />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => product.inStock && handleAddToCart(product.id)}
                                disabled={!product.inStock}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                  inCart
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : product.inStock
                                    ? "bg-[#6366F1] hover:bg-[#5558E3] text-white"
                                    : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                                }`}
                              >
                                {inCart ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    Added
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart className="w-3.5 h-3.5" />
                                    Add to Cart
                                  </>
                                )}
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Bottom CTA */}
            {filtered.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="mt-16 rounded-2xl bg-gradient-to-br from-[#6366F1]/20 to-[#22D3EE]/10 border border-[#6366F1]/20 p-8 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#22D3EE] flex items-center justify-center mx-auto mb-4 shadow-[0_0_24px_rgba(99,102,241,0.4)]">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Need help choosing?</h3>
                <p className="text-slate-400 text-sm mb-5 max-w-sm mx-auto leading-relaxed">
                  Our tech experts are ready to help you find the perfect accessories for your setup.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6366F1] hover:bg-[#5558E3] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.5)]"
                >
                  Talk to an Expert
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}