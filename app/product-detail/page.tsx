"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { useTranslations } from "next-intl";
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, ChevronRight, Check, Minus, Plus, Zap, Award, MessageSquare, ThumbsUp } from 'lucide-react';

// ─── Inline mock data ────────────────────────────────────────────────────────

const product = {
  id: "2",
  name: "GaN 100W USB-C Charger",
  slug: "gan-100w-usb-c-charger",
  category: "Chargers",
  price: 59.99,
  originalPrice: 79.99,
  rating: 4.9,
  reviewCount: 487,
  badge: "Top Rated",
  inStock: true,
  description:
    "Ultra-compact GaN charger with 100W output. Charge your laptop, tablet, and phone simultaneously with three ports. 60% smaller than traditional chargers with the same power delivery.",
  longDescription:
    "The GaN 100W USB-C Charger redefines what a compact charger can do. Built with third-generation Gallium Nitride (GaN III) technology, it delivers desktop-class power in a pocket-sized form factor. Whether you are powering a MacBook Pro, an iPad, and an iPhone at the same time or fast-charging a single device at full 100W, this charger handles it all without breaking a sweat. The intelligent power distribution automatically allocates wattage across ports so every device charges at its optimal speed.",
  specs: {
    "Total Output": "100W",
    Ports: "2x USB-C, 1x USB-A",
    Technology: "GaN III",
    Compatibility: "Universal (MacBook, iPad, iPhone, Android, Windows)",
    Size: "55 x 55 x 30mm",
    Weight: "148g",
    "Input Voltage": "100-240V AC",
    Certifications: "CE, FCC, RoHS",
  },
  images: [
    "https://m.media-amazon.com/images/I/516szWmX2ZL._AC_UF894,1000_QL80_.jpg",
    "/images/gan-charger-ports-detail.jpg",
    "/images/gan-charger-size-comparison.jpg",
    "/images/gan-charger-in-use.jpg",
  ],
  colors: ["Midnight Black", "Arctic White", "Slate Gray"],
};

const reviews = [
  {
    id: "r1",
    author: "Marcus T.",
    avatar: "MT",
    rating: 5,
    date: "Jan 14, 2025",
    title: "Best charger I have ever owned",
    body: "Replaced three separate chargers with this one. It handles my MacBook Pro, iPad Pro, and iPhone simultaneously without any throttling. The compact size is genuinely impressive.",
    helpful: 42,
    verified: true,
  },
  {
    id: "r2",
    author: "Priya S.",
    avatar: "PS",
    rating: 5,
    date: "Jan 9, 2025",
    title: "Travel essential — never leaving home without it",
    body: "I travel frequently for work and this has replaced my entire charging kit. One charger, one cable, done. The universal voltage support means it works everywhere I go.",
    helpful: 38,
    verified: true,
  },
  {
    id: "r3",
    author: "Jordan K.",
    avatar: "JK",
    rating: 4,
    date: "Dec 28, 2024",
    title: "Excellent power, runs slightly warm",
    body: "At full 100W load it does get warm, which is expected for GaN tech. Performance is flawless though. Would love a slightly longer warranty period but overall very satisfied.",
    helpful: 21,
    verified: true,
  },
  {
    id: "r4",
    author: "Aisha M.",
    avatar: "AM",
    rating: 5,
    date: "Dec 19, 2024",
    title: "Charges my laptop faster than the OEM charger",
    body: "Tested it against the original Apple 96W charger and this one actually charges my M2 MacBook Pro faster. The build quality feels premium and the cable grip is solid.",
    helpful: 56,
    verified: true,
  },
];

const relatedProducts = [
  {
    id: "r-1",
    name: "MagSafe Braided USB-C Cable 2m",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MPL43?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1698168621764",
    badge: "Best Seller",
  },
  {
    id: "r-2",
    name: "65W Dual-Port Travel Charger",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.6,
    image: "/images/dual-port-travel-charger.jpg",
    badge: null,
  },
  {
    id: "r-3",
    name: "USB-C Hub 7-in-1",
    price: 49.99,
    originalPrice: 64.99,
    rating: 4.7,
    image: "/images/usb-c-hub-7-in-1.jpg",
    badge: "New",
  },
  {
    id: "r-4",
    name: "Wireless Charging Pad 15W",
    price: 34.99,
    originalPrice: null,
    rating: 4.5,
    image: "https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dwf60e9e05/images/hi-res/d/93e13306ec1adb0d_belkin-wia009ttbk-wireless-magnetic-charging-pad-qi2-web-gallery-01-us.jpg?sfrm=png",
    badge: null,
  },
];

const trustBadges = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On orders over $50",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    desc: "Hassle-free returns",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    desc: "Full coverage included",
  },
  {
    icon: Award,
    title: "Certified Quality",
    desc: "CE, FCC & RoHS certified",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          style={{ width: size, height: size }}
          className={
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-700 text-slate-700"
          }
        />
      ))}
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-slate-400 w-8 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full"
        />
      </div>
      <span className="text-slate-500 w-8 text-right shrink-0">{value}%</span>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const t = useTranslations();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  return (
    <main className="min-h-screen bg-[#0F172A] text-white">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#6366F1]/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#22D3EE]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">

        {/* Breadcrumb */}
        <motion.nav
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 text-sm text-slate-500 mb-10"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#22D3EE] transition-colors duration-200">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-[#22D3EE] transition-colors duration-200">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop?category=chargers" className="hover:text-[#22D3EE] transition-colors duration-200">Chargers</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-300 truncate max-w-[200px]">{product.name}</span>
        </motion.nav>

        {/* ── Product Hero ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20">

          {/* Image Gallery */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#1E293B] border border-white/8 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
              <img
                src={product.images[selectedImage] ?? product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#6366F1] to-[#22D3EE] text-white shadow-lg">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/90 text-white">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === idx
                      ? "border-[#6366F1] shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Category + title */}
            <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-3">
              {product.category}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight mb-4 text-balance">
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={product.rating} size={18} />
              <span className="text-amber-400 font-semibold text-sm">{product.rating}</span>
              <span className="text-slate-500 text-sm">({product.reviewCount} reviews)</span>
              {product.inStock ? (
                <span className="ml-auto flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  In Stock
                </span>
              ) : (
                <span className="ml-auto text-rose-400 text-sm font-medium">Out of Stock</span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-slate-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/20">
                  Save ${(product.originalPrice! - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-slate-400 leading-relaxed mb-8 text-pretty">
              {product.description}
            </p>

            {/* Color selector */}
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-300 mb-3">
                Color: <span className="text-white">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                      selectedColor === color
                        ? "border-[#6366F1] bg-[#6366F1]/15 text-[#a5b4fc]"
                        : "border-white/10 bg-white/5 text-slate-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-6">
              {/* Quantity */}
              <div className="flex items-center gap-0 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-3 text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 py-3 text-white font-semibold text-sm min-w-[48px] text-center border-x border-white/10">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-3 text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to cart */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  addedToCart
                    ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_28px_rgba(99,102,241,0.55)]"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </motion.button>

              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setWishlisted((w) => !w)}
                aria-label="Add to wishlist"
                className={`p-3.5 rounded-xl border transition-all duration-200 ${
                  wishlisted
                    ? "border-rose-500/40 bg-rose-500/15 text-rose-400"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-white/25 hover:text-white"
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-rose-400" : ""}`} />
              </motion.button>

              {/* Share */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Share product"
                className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:border-white/25 hover:text-white transition-all duration-200"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Trust badges row */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {trustBadges.map((badge) => (
                <div
                  key={badge.title}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/4 border border-white/8"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#6366F1]/15 flex items-center justify-center shrink-0">
                    <badge.icon className="w-4 h-4 text-[#a5b4fc]" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{badge.title}</p>
                    <p className="text-slate-500 text-xs">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Tabs: Description / Specs / Reviews ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          {/* Tab bar */}
          <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/8 w-fit mb-8">
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white shadow-[0_2px_12px_rgba(99,102,241,0.35)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab === "reviews" ? `Reviews (${product.reviewCount})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Description tab */}
          {activeTab === "description" && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-5 gap-10"
            >
              <div className="lg:col-span-3 space-y-5">
                <p className="text-slate-300 leading-relaxed text-pretty">
                  {product.longDescription}
                </p>
                <ul className="space-y-3">
                  {[
                    "100W total output across three ports simultaneously",
                    "GaN III technology runs 60% cooler than silicon chargers",
                    "Intelligent power distribution — every device charges at peak speed",
                    "Universal voltage (100-240V) for worldwide travel",
                    "Foldable prongs for compact, pocket-friendly carry",
                    "Certified safe: CE, FCC, and RoHS compliant",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-slate-400 text-sm">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#6366F1]/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#a5b4fc]" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-2">
                <div className="rounded-2xl overflow-hidden border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  <img
                    src="/images/gan-charger-in-use.jpg"
                    alt="GaN charger in use"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Specs tab */}
          {activeTab === "specs" && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <div className="rounded-2xl border border-white/8 overflow-hidden">
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`flex items-center gap-6 px-6 py-4 ${
                      idx % 2 === 0 ? "bg-white/3" : "bg-transparent"
                    } ${idx !== 0 ? "border-t border-white/6" : ""}`}
                  >
                    <span className="text-slate-500 text-sm font-medium w-40 shrink-0">{key}</span>
                    <span className="text-white text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reviews tab */}
          {activeTab === "reviews" && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              {/* Rating summary */}
              <motion.div variants={fadeInUp} className="lg:col-span-1">
                <div className="rounded-2xl bg-white/4 border border-white/8 p-6 sticky top-24">
                  <div className="text-center mb-6">
                    <p className="text-6xl font-bold text-white mb-1">{product.rating}</p>
                    <StarRating rating={product.rating} size={20} />
                    <p className="text-slate-500 text-sm mt-2">{product.reviewCount} verified reviews</p>
                  </div>
                  <div className="space-y-2.5">
                    <RatingBar label="5★" value={78} />
                    <RatingBar label="4★" value={14} />
                    <RatingBar label="3★" value={5} />
                    <RatingBar label="2★" value={2} />
                    <RatingBar label="1★" value={1} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#6366F1]/40 bg-[#6366F1]/10 text-[#a5b4fc] text-sm font-medium hover:bg-[#6366F1]/20 transition-all duration-200"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Write a Review
                  </motion.button>
                </div>
              </motion.div>

              {/* Review cards */}
              <div className="lg:col-span-2 space-y-4">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    variants={fadeInUp}
                    className="rounded-2xl bg-white/4 border border-white/8 p-6 hover:border-white/15 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#22D3EE] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {review.avatar}
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">{review.author}</p>
                          <div className="flex items-center gap-2">
                            <StarRating rating={review.rating} size={12} />
                            {review.verified && (
                              <span className="text-emerald-400 text-xs flex items-center gap-1">
                                <Check className="w-3 h-3" /> Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-slate-600 text-xs shrink-0">{review.date}</span>
                    </div>
                    <p className="text-white text-sm font-semibold mb-2">{review.title}</p>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{review.body}</p>
                    <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs transition-colors duration-150">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Helpful ({review.helpful})
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* ── Related Products ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[#22D3EE] text-xs font-semibold tracking-widest uppercase mb-1">
                You Might Also Like
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-white">Related Products</h2>
            </div>
            <Link
              href="/shop"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#22D3EE] transition-colors duration-200 group"
            >
              View all
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {relatedProducts.map((item) => (
              <motion.div
                key={item.id}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group rounded-2xl bg-white/4 border border-white/8 overflow-hidden hover:border-white/18 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-[#1E293B]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#6366F1] to-[#22D3EE] text-white">
                      {item.badge}
                    </span>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#0F172A]/80 backdrop-blur-sm border border-white/15 flex items-center justify-center text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="p-4">
                  <p className="text-white text-sm font-semibold leading-snug mb-2 line-clamp-2">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-1.5 mb-3">
                    <StarRating rating={item.rating} size={12} />
                    <span className="text-slate-500 text-xs">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-slate-500 text-sm line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── CTA Banner ── */}
        <motion.section
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1E1B4B] via-[#1a1f3a] to-[#0F172A] p-10 md:p-14 text-center"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#6366F1]/15 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/25 text-[#a5b4fc] text-xs font-semibold tracking-widest uppercase mb-5">
              <Zap className="w-3.5 h-3.5" />
              Limited Time Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 text-balance">
              Bundle and Save Up to 30%
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8 text-pretty leading-relaxed">
              Pair this charger with a braided USB-C cable and a wireless charging pad for a complete charging setup at a fraction of the cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-semibold text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_32px_rgba(99,102,241,0.6)] transition-all duration-300"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Shop Bundles
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/25 transition-all duration-300"
                >
                  Browse All Products
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}