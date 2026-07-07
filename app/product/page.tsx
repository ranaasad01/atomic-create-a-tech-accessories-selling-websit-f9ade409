"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { Star, Heart, ShoppingCart, Shield, Truck, RotateCcw, ChevronRight, Check, Minus, Plus, ThumbsUp, Share2, Zap } from 'lucide-react';
import { useTranslations } from "next-intl";

// ─── Inline mock data ────────────────────────────────────────────────────────

const product = {
  id: "2",
  name: "GaN 100W USB-C Charger",
  category: "Chargers",
  categorySlug: "chargers",
  price: 59.99,
  originalPrice: 79.99,
  rating: 4.9,
  reviewCount: 487,
  badge: "Top Rated",
  inStock: true,
  description:
    "The GaN 100W USB-C Charger redefines compact power delivery. Built with third-generation Gallium Nitride technology, it delivers up to 100W of total output across three ports simultaneously — enough to fast-charge your laptop, tablet, and smartphone at the same time. At 60% smaller than a traditional 65W brick, it slips into any bag without a second thought. Intelligent power distribution automatically allocates wattage where it is needed most, while multi-layer surge and temperature protection keep your devices safe.",
  images: [
    "https://m.media-amazon.com/images/I/516szWmX2ZL._AC_UF894,1000_QL80_.jpg",
    "/images/gan-charger-ports-detail.jpg",
    "/images/gan-charger-size-comparison.jpg",
    "/images/gan-charger-in-use-laptop.jpg",
  ],
  colors: [
    { label: "Midnight Black", value: "black", hex: "#1e1e2e" },
    { label: "Arctic White", value: "white", hex: "#f1f5f9" },
    { label: "Slate Gray", value: "gray", hex: "#64748b" },
  ],
  specs: [
    { label: "Total Output", value: "100W" },
    { label: "Port 1 (USB-C)", value: "Up to 65W PD" },
    { label: "Port 2 (USB-C)", value: "Up to 45W PD" },
    { label: "Port 3 (USB-A)", value: "Up to 22.5W QC 4+" },
    { label: "Technology", value: "GaN III" },
    { label: "Input", value: "100–240V AC, 50/60Hz" },
    { label: "Dimensions", value: "55 × 55 × 30 mm" },
    { label: "Weight", value: "148 g" },
    { label: "Cable Included", value: "USB-C to USB-C, 1m" },
    { label: "Certifications", value: "CE, FCC, RoHS, UL" },
    { label: "Compatibility", value: "Universal — MacBook, iPad, iPhone, Android, Switch" },
    { label: "Warranty", value: "2 years" },
  ],
};

const reviews = [
  {
    id: "r1",
    author: "Marcus T.",
    avatar: "/images/reviewer-marcus.jpg",
    rating: 5,
    date: "March 12, 2025",
    title: "Finally replaced my three-charger setup",
    body: "I used to travel with a separate charger for my MacBook Pro, iPad, and iPhone. This single brick handles all three at full speed. The size is genuinely shocking — smaller than my old 30W Apple charger. Build quality feels premium and it runs cool even under full load.",
    helpful: 94,
    verified: true,
  },
  {
    id: "r2",
    author: "Priya S.",
    avatar: "/images/reviewer-priya.jpg",
    rating: 5,
    date: "February 28, 2025",
    title: "Best charger I have ever owned",
    body: "Charges my Dell XPS 15 at full 65W while simultaneously fast-charging my Galaxy S24 Ultra and AirPods. The intelligent power allocation is real — it actually adjusts when I unplug a device. Highly recommend for anyone who works from cafes or airports.",
    helpful: 71,
    verified: true,
  },
  {
    id: "r3",
    author: "Jordan K.",
    avatar: "/images/reviewer-jordan.jpg",
    rating: 4,
    date: "February 14, 2025",
    title: "Excellent, minor gripe about the plug",
    body: "Performance is flawless and the compact size is a game-changer. My only wish is that the plug folded flat like Apple's chargers. That said, it still fits in my jacket pocket and the power output is unmatched at this price point.",
    helpful: 38,
    verified: true,
  },
  {
    id: "r4",
    author: "Aisha M.",
    avatar: "/images/reviewer-aisha.jpg",
    rating: 5,
    date: "January 30, 2025",
    title: "Worth every cent",
    body: "Replaced a 140W Apple charger that cost twice as much. This handles my M3 MacBook Pro at full speed on the 65W port. The other two ports are genuinely useful, not an afterthought. Runs slightly warm but never hot. Solid purchase.",
    helpful: 55,
    verified: false,
  },
];

const relatedProducts = [
  {
    id: "rp1",
    name: "MagSafe Braided USB-C Cable 2m",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviewCount: 312,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MPL43?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1698168621764",
    badge: "Best Seller",
    slug: "product",
  },
  {
    id: "rp2",
    name: "65W Slim Travel Charger",
    price: 39.99,
    originalPrice: 54.99,
    rating: 4.6,
    reviewCount: 198,
    image: "/images/slim-travel-charger-white.jpg",
    badge: "Sale",
    slug: "product",
  },
  {
    id: "rp3",
    name: "USB-C Hub 7-in-1",
    price: 49.99,
    rating: 4.7,
    reviewCount: 241,
    image: "/images/usb-c-hub-7-in-1-space-gray.jpg",
    slug: "product",
  },
  {
    id: "rp4",
    name: "Wireless Charging Pad 15W",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.5,
    reviewCount: 167,
    image: "https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dwf60e9e05/images/hi-res/d/93e13306ec1adb0d_belkin-wia009ttbk-wireless-magnetic-charging-pad-qi2-web-gallery-01-us.jpg?sfrm=png",
    badge: "New",
    slug: "product",
  },
];

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-700 text-slate-700"
          }
        />
      ))}
    </span>
  );
}

function RatingBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-slate-400 w-6 text-right">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-amber-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        />
      </div>
      <span className="text-slate-500 w-8">{pct}%</span>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const t = useTranslations();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  function handleQuantityChange(delta: number) {
    setQuantity((q) => Math.max(1, Math.min(10, q + delta)));
  }

  const ratingBars = [
    { label: "5", pct: 78 },
    { label: "4", pct: 14 },
    { label: "3", pct: 5 },
    { label: "2", pct: 2 },
    { label: "1", pct: 1 },
  ];

  return (
    <main className="min-h-screen bg-[#0F172A] text-white">
      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-4">
        <motion.nav
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-1.5 text-sm text-slate-500"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-slate-300 transition-colors">
            {t("nav.home")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-slate-300 transition-colors">
            {t("nav.shop")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/shop?category=${product.categorySlug}`}
            className="hover:text-slate-300 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-300 truncate max-w-[180px]">{product.name}</span>
        </motion.nav>
      </div>

      {/* ── Two-column product section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* LEFT — Gallery */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-800/60 border border-white/8 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={`${product.name} — view ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80";
                  }}
                />
              </AnimatePresence>

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-[#6366F1] text-white shadow-lg">
                  {product.badge}
                </span>
              )}

              {/* Discount badge */}
              {discount > 0 && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-lg">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === idx
                      ? "border-[#6366F1] shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&q=60";
                    }}
                  />
                  {activeImage === idx && (
                    <div className="absolute inset-0 bg-[#6366F1]/10" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
                { icon: RotateCcw, label: "30-Day Returns", sub: "Hassle-free" },
                { icon: Shield, label: "2-Year Warranty", sub: "Fully covered" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-800/40 border border-white/6 text-center"
                >
                  <Icon className="w-5 h-5 text-[#22D3EE]" />
                  <span className="text-xs font-medium text-slate-200">{label}</span>
                  <span className="text-[10px] text-slate-500">{sub}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Product info */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Category + name */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6366F1]">
                {product.category}
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating row */}
            <div className="flex items-center gap-3 flex-wrap">
              <StarRow rating={product.rating} size={18} />
              <span className="text-amber-400 font-semibold">{product.rating}</span>
              <span className="text-slate-500 text-sm">
                ({product.reviewCount.toLocaleString("en-US")} reviews)
              </span>
              <span className="ml-auto text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                In Stock
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-slate-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  Save ${(product.originalPrice! - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <div className="h-px bg-white/8" />

            {/* Color selector */}
            <div>
              <p className="text-sm font-medium text-slate-300 mb-3">
                Color:{" "}
                <span className="text-white">
                  {product.colors.find((c) => c.value === selectedColor)?.label ?? ""}
                </span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <motion.button
                    key={color.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-9 h-9 rounded-full border-2 transition-all duration-200 relative ${
                      selectedColor === color.value
                        ? "border-[#6366F1] shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                        : "border-white/20 hover:border-white/50"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.label}
                    title={color.label}
                  >
                    {selectedColor === color.value && (
                      <Check
                        className="absolute inset-0 m-auto w-4 h-4"
                        style={{
                          color: color.value === "white" ? "#1e1e2e" : "#ffffff",
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity picker */}
            <div>
              <p className="text-sm font-medium text-slate-300 mb-3">Quantity</p>
              <div className="flex items-center gap-0 w-fit rounded-xl border border-white/10 bg-slate-800/50 overflow-hidden">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="px-5 py-3 text-white font-semibold min-w-[3rem] text-center select-none">
                  {quantity}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  addedToCart
                    ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-gradient-to-r from-[#6366F1] to-[#818CF8] text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_28px_rgba(99,102,241,0.6)]"
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setWishlisted((w) => !w)}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  wishlisted
                    ? "bg-rose-500/15 border-rose-500/40 text-rose-400"
                    : "bg-slate-800/50 border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30"
                }`}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-rose-400" : ""}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-xl border border-white/10 bg-slate-800/50 text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200"
                aria-label="Share product"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Buy now */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl border border-[#6366F1]/40 text-[#818CF8] font-semibold text-sm hover:bg-[#6366F1]/10 transition-all duration-200"
            >
              Buy Now — Express Checkout
            </motion.button>

            {/* Quick specs preview */}
            <div className="rounded-xl bg-slate-800/40 border border-white/6 p-4 grid grid-cols-2 gap-3">
              {product.specs.slice(0, 4).map((spec) => (
                <div key={spec.label} className="flex flex-col gap-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                    {spec.label}
                  </span>
                  <span className="text-sm text-slate-200 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tabbed section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex gap-1 p-1 rounded-xl bg-slate-800/50 border border-white/8 w-fit mb-10"
        >
          {(["description", "specs", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#6366F1] text-white shadow-[0_2px_12px_rgba(99,102,241,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "reviews" ? `Reviews (${reviews.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              key="description"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="max-w-3xl"
            >
              <p className="text-slate-300 leading-relaxed text-lg mb-8">
                {product.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Zap,
                    title: "GaN III Technology",
                    body: "Third-generation Gallium Nitride runs cooler and more efficiently than silicon, enabling a dramatically smaller form factor without sacrificing output.",
                  },
                  {
                    icon: Shield,
                    title: "Multi-layer Protection",
                    body: "Over-voltage, over-current, over-temperature, and short-circuit protection keep your devices safe during every charge cycle.",
                  },
                  {
                    icon: Truck,
                    title: "Universal Compatibility",
                    body: "Works with every USB-C and USB-A device — MacBooks, iPads, iPhones, Android phones, Nintendo Switch, and more.",
                  },
                  {
                    icon: RotateCcw,
                    title: "Smart Power Allocation",
                    body: "Automatically redistributes wattage across active ports so each device always receives the fastest possible charge.",
                  },
                ].map(({ icon: Icon, title, body }) => (
                  <motion.div
                    key={title}
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -2 }}
                    className="p-5 rounded-xl bg-slate-800/40 border border-white/6 hover:border-[#6366F1]/30 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#6366F1]/15 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-[#6366F1]" />
                    </div>
                    <h3 className="text-white font-semibold mb-1.5">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "specs" && (
            <motion.div
              key="specs"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="max-w-2xl"
            >
              <div className="rounded-2xl border border-white/8 overflow-hidden">
                {product.specs.map((spec, idx) => (
                  <motion.div
                    key={spec.label}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    className={`flex items-start gap-4 px-6 py-4 ${
                      idx % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/10"
                    } ${idx !== product.specs.length - 1 ? "border-b border-white/6" : ""}`}
                  >
                    <span className="text-slate-500 text-sm w-40 flex-shrink-0 pt-0.5">
                      {spec.label}
                    </span>
                    <span className="text-slate-200 text-sm font-medium">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {/* Rating summary */}
              <div className="flex flex-col sm:flex-row gap-8 mb-10 p-6 rounded-2xl bg-slate-800/30 border border-white/8 max-w-2xl">
                <div className="flex flex-col items-center justify-center gap-2 min-w-[120px]">
                  <span className="text-6xl font-bold text-white">{product.rating}</span>
                  <StarRow rating={product.rating} size={20} />
                  <span className="text-slate-500 text-sm">
                    {product.reviewCount.toLocaleString("en-US")} reviews
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-2 justify-center">
                  {ratingBars.map((bar) => (
                    <RatingBar key={bar.label} label={bar.label} pct={bar.pct} />
                  ))}
                </div>
              </div>

              {/* Review cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid sm:grid-cols-2 gap-5 max-w-4xl"
              >
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    variants={fadeInUp}
                    whileHover={{ y: -3 }}
                    className="p-6 rounded-2xl bg-slate-800/40 border border-white/8 hover:border-white/15 transition-all duration-300 flex flex-col gap-4"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#22D3EE] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                        {review.author.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-semibold text-sm">
                            {review.author}
                          </span>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                              <Check className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <StarRow rating={review.rating} size={13} />
                          <span className="text-slate-500 text-xs">{review.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <p className="text-white font-medium text-sm mb-1.5">{review.title}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{review.body}</p>
                    </div>

                    {/* Helpful */}
                    <div className="flex items-center gap-2 pt-1 border-t border-white/6">
                      <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Related products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6366F1]">
              You Might Also Like
            </span>
            <h2 className="mt-1 text-2xl font-bold text-white tracking-tight">
              Related Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {relatedProducts.map((rp) => (
            <motion.div
              key={rp.id}
              variants={scaleIn}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-slate-800/40 border border-white/8 hover:border-[#6366F1]/30 overflow-hidden transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)]"
            >
              <Link href={`/${rp.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-slate-800">
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=70";
                    }}
                  />
                  {rp.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#6366F1] text-white">
                      {rp.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-white text-sm font-medium leading-snug mb-2 line-clamp-2">
                    {rp.name}
                  </p>
                  <div className="flex items-center gap-1.5 mb-3">
                    <StarRow rating={rp.rating} size={12} />
                    <span className="text-slate-500 text-xs">({rp.reviewCount})</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white font-bold">${rp.price.toFixed(2)}</span>
                    {rp.originalPrice && (
                      <span className="text-slate-500 text-xs line-through">
                        ${rp.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bottom spacer */}
      <div className="h-16" />
    </main>
  );
}