"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { Zap, Shield, Truck, RotateCcw, Star, ArrowRight, Check, Headphones, Cable, Mouse, HardDrive, ChevronRight, Sparkles } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import { useTranslations } from "next-intl";

// ─── Inline data ────────────────────────────────────────────────────────────

const featuredProducts = [
  {
    id: "1",
    name: "MagSafe Braided USB-C Cable 2m",
    category: "Cables",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviewCount: 312,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MPL43?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1698168621764",
    badge: "Best Seller",
    badgeColor: "bg-[#6366F1]",
    description: "240W fast charging, 10 Gbps data, 30k-bend rated.",
  },
  {
    id: "2",
    name: "GaN 100W USB-C Charger",
    category: "Chargers",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviewCount: 487,
    image: "https://m.media-amazon.com/images/I/516szWmX2ZL._AC_UF894,1000_QL80_.jpg",
    badge: "Top Rated",
    badgeColor: "bg-[#22D3EE] text-[#0F172A]",
    description: "Ultra-compact GaN III, 3 ports, 60% smaller than standard.",
  },
  {
    id: "3",
    name: "Studio-Grade Wireless Headphones",
    category: "Audio",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 156,
    image: "https://m.media-amazon.com/images/I/51N2OJQ8ggL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale",
    badgeColor: "bg-rose-500",
    description: "40-hour battery, active noise cancellation, studio tuning.",
  },
  {
    id: "4",
    name: "Mechanical Keyboard TKL",
    category: "Peripherals",
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviewCount: 224,
    image: "https://www.keychronsg.com/cdn/shop/files/Keychron-K8-tenkeyless-wireless-mechanical-keyboard-for-Mac-Windows-iOS-RGB-white-backlight-with-gateron-Optical-brown-switch..jpg?v=1723448906&width=1214",
    badge: "New",
    badgeColor: "bg-emerald-500",
    description: "Hot-swap switches, RGB per-key, aluminum frame.",
  },
  {
    id: "5",
    name: "Portable SSD 1TB",
    category: "Storage",
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviewCount: 341,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HRQ22?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=VTZkM09mWUd4OEczWWtRTWtqTDh2Z2tuVHYzMERCZURia3c5SzJFOTlPaGlOZm1vUXN2cjVNeTNKZXZEclZjS1pDUWFVdVE5K2FoaFRBeE1Xazhyc2c",
    badge: "Fast",
    badgeColor: "bg-amber-500",
    description: "1050 MB/s read, USB 3.2 Gen 2, drop-proof casing.",
  },
  {
    id: "6",
    name: "Ergonomic Wireless Mouse",
    category: "Peripherals",
    price: 49.99,
    originalPrice: 64.99,
    rating: 4.6,
    reviewCount: 189,
    image: "http://manhattanproducts.us/cdn/shop/products/wireless-ergonomic-mouse-with-2-in-1-usb-receiver-190237-1.jpg?v=1695233143",
    badge: "Popular",
    badgeColor: "bg-violet-500",
    description: "4000 DPI, silent clicks, 70-day battery life.",
  },
];

const valueProps = [
  {
    icon: Zap,
    title: "Fast Charging Tech",
    body: "Every charger and cable in our lineup supports the latest GaN and USB Power Delivery standards, so your devices top up in record time.",
  },
  {
    icon: Shield,
    title: "Built to Last",
    body: "Reinforced connectors, military-grade drop protection, and braided nylon construction mean our accessories survive real-world use.",
  },
  {
    icon: Truck,
    title: "Free 2-Day Shipping",
    body: "Orders over $35 ship free with guaranteed 2-day delivery across the continental US. International shipping available at checkout.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    body: "Not satisfied? Return any item within 30 days for a full refund, no questions asked. We cover the return shipping label.",
  },
];

const categories = [
  { name: "Cables", icon: Cable, count: 24, slug: "cables", color: "from-[#6366F1]/20 to-[#6366F1]/5" },
  { name: "Audio", icon: Headphones, count: 15, slug: "audio", color: "from-[#22D3EE]/20 to-[#22D3EE]/5" },
  { name: "Peripherals", icon: Mouse, count: 21, slug: "peripherals", color: "from-violet-500/20 to-violet-500/5" },
  { name: "Storage", icon: HardDrive, count: 12, slug: "storage", color: "from-amber-500/20 to-amber-500/5" },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah K.",
    role: "Product Designer",
    avatar: "https://www.cubesmart.com/post/facility_virtual_tour/4301-9.jpg",
    rating: 5,
    text: "The GaN charger is a game-changer. I travel with one brick instead of three and my laptop charges faster than ever. Absolutely worth every cent.",
  },
  {
    id: "t2",
    name: "Marcus T.",
    role: "Software Engineer",
    avatar: "https://yt3.googleusercontent.com/ZNbKQvIcygyt1igH4EOHWYLlw0jgoYtTBMf7mC8KE2sAuUNSHAwy8CG2CzkpTE8RlVlYqmhQnA=s900-c-k-c0x00ffffff-no-rj",
    rating: 5,
    text: "I've gone through so many cheap cables that fray after a month. The braided USB-C cable from TechGear is still perfect after a year of daily use.",
  },
  {
    id: "t3",
    name: "Priya M.",
    role: "Content Creator",
    avatar: "https://www.advnmt.com/wp-content/uploads/2025/07/Priya.webp",
    rating: 5,
    text: "The wireless headphones have studio-quality sound at a fraction of the price. The noise cancellation lets me record voiceovers anywhere.",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "200+", label: "Premium Products" },
  { value: "4.8", label: "Average Rating" },
  { value: "99%", label: "Satisfaction Rate" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5" data-atomic-id="amgf7s">
      <div className="flex items-center gap-0.5" data-atomic-id="a1iyj497">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "text-slate-600"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-400" data-atomic-id="a136mujg">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof featuredProducts)[0];
  index: number;
}) {
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative bg-[#111827] border border-white/8 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] hover:border-[#6366F1]/40 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_16px_40px_-8px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${product.badgeColor}`}
          data-atomic-id="ao6hnaz">
          {product.badge}
        </div>
      )}
      {/* Discount */}
      {discount > 0 && (
        <div
          className="absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30"
          data-atomic-id="a9e0fjz">
          -{discount}%
        </div>
      )}
      {/* Image */}
      <div
        className="relative h-52 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden"
        data-atomic-id="aouduu6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          data-atomic-id="a1pu1ndn" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          data-atomic-id="a1pvgd7n" />
      </div>
      {/* Content */}
      <div className="p-5" data-atomic-id="aox7j36">
        <p
          className="text-xs text-[#22D3EE] font-medium mb-1 tracking-wide uppercase"
          data-atomic-id="a1dbbv1u">
          {product.category}
        </p>
        <h3
          className="text-white font-semibold text-sm leading-snug mb-2 line-clamp-2"
          data-atomic-id="a1spfsin">
          {product.name}
        </h3>
        <p
          className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2"
          data-atomic-id="a1dbbyeu">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviewCount} />

        <div
          className="flex items-center justify-between mt-4"
          data-atomic-id="a4ibyb1">
          <div className="flex items-baseline gap-2" data-atomic-id="aybn4pc">
            <span className="text-white font-bold text-lg" data-atomic-id="ayu35gi">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-slate-500 text-sm line-through" data-atomic-id="a155qbtc">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 rounded-lg bg-[#6366F1] hover:bg-[#5558E8] text-white text-xs font-semibold transition-colors duration-200"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (variants: Variants) =>
    shouldReduceMotion ? {} : { variants };

  return (
    <main
      className="bg-[#0F172A] text-white overflow-x-hidden"
      data-atomic-id="ayd58ec">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
        data-atomic-id="a12bmc8p">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none" data-atomic-id="abokm6k">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[120px]"
            data-atomic-id="a1joo0sv" />
          <div
            className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#22D3EE]/8 rounded-full blur-[100px]"
            data-atomic-id="a1jq2uxd" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
            data-atomic-id="a1jswj6d" />
        </div>

        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          data-atomic-id="abpzgb2">
          <div
            className="grid lg:grid-cols-2 gap-16 items-center"
            data-atomic-id="a1qgjl5d">Discover essential tech accessories designed for performance and style. Discounted offers!</div>
        </div>
      </section>
      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 relative" data-atomic-id="apjl0u5">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="ap6wwr2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="mb-12 flex items-end justify-between flex-wrap gap-4">
              <div data-atomic-id="a4417zr">
                <p
                  className="text-[#22D3EE] text-sm font-semibold uppercase tracking-widest mb-2"
                  data-atomic-id="a18sldyf">
                  {t("categories.eyebrow")}
                </p>
                <h2
                  className="text-4xl font-extrabold tracking-tight text-white"
                  data-atomic-id="a1lle8c3">
                  {t("categories.heading")}
                </h2>
              </div>
              <Link
                href="/shop"
                className="flex items-center gap-1 text-[#6366F1] hover:text-[#A5B4FC] text-sm font-semibold transition-colors duration-200"
              >
                {t("categories.view_all")} <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              data-atomic-id="ami9rzq">
              {categories.map((cat, __atomicIdx) => {
                const Icon = cat.icon;
                return (
                  <motion.div key={cat.slug} variants={scaleIn}>
                    <Link
                      href={`/shop?category=${cat.slug}`}
                      className={`group flex flex-col items-center justify-center gap-3 p-8 rounded-2xl bg-gradient-to-br ${cat.color} border border-white/8 hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                        className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div
                        className="text-center"
                        data-atomic-id="a17521ty"
                        data-atomic-instance={__atomicIdx}>
                        <p
                          className="text-white font-semibold text-sm"
                          data-atomic-id="a1poqrpy"
                          data-atomic-instance={__atomicIdx}>{cat.name}</p>
                        <p
                          className="text-slate-400 text-xs mt-0.5"
                          data-atomic-id="a1poqteg"
                          data-atomic-instance={__atomicIdx}>{cat.count} items</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section id="featured" className="py-20 relative" data-atomic-id="a122k58o">
        <div className="absolute inset-0 pointer-events-none" data-atomic-id="audx5rt">
          <div
            className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#6366F1]/6 rounded-full blur-[100px]"
            data-atomic-id="a1hnttss" />
        </div>
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="aufbzwb">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="mb-12 flex items-end justify-between flex-wrap gap-4">
              <div data-atomic-id="a1ny6w3o">
                <p
                  className="text-[#22D3EE] text-sm font-semibold uppercase tracking-widest mb-2"
                  data-atomic-id="aotj2dw">
                  {t("featured.eyebrow")}
                </p>
                <h2
                  className="text-4xl font-extrabold tracking-tight text-white"
                  data-atomic-id="a11qa4ao">Best sellers this month across globe</h2>
                <p
                  className="text-slate-400 mt-2 max-w-lg text-pretty"
                  data-atomic-id="aotj5qw">
                  {t("featured.subtext")}
                </p>
              </div>
              <Link
                href="/shop"
                className="flex items-center gap-1 text-[#6366F1] hover:text-[#A5B4FC] text-sm font-semibold transition-colors duration-200"
              >
                {t("featured.view_all")} <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-atomic-id="a1ik1p43">
              {featuredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── Value Props ───────────────────────────────────────────────────── */}
      <section
        id="features"
        className="py-20 bg-[#080E1A] relative overflow-hidden"
        data-atomic-id="apaitu4">
        <div
          className="absolute inset-0 pointer-events-none"
          data-atomic-id="a17xoagt">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#22D3EE]/5 rounded-full blur-[80px]"
            data-atomic-id="a48ra5c" />
        </div>
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="a17z34lb">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p
                className="text-[#22D3EE] text-sm font-semibold uppercase tracking-widest mb-3"
                data-atomic-id="au9a21h">
                {t("values.eyebrow")}
              </p>
              <h2
                className="text-4xl font-extrabold tracking-tight text-white mb-4"
                data-atomic-id="a42omzl">
                {t("values.heading")}
              </h2>
              <p
                className="text-slate-400 max-w-xl mx-auto text-pretty"
                data-atomic-id="au9a5eh">
                {t("values.subtext")}
              </p>
            </motion.div>

            {/* Asymmetric bento layout */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-atomic-id="ak80lih">
              {valueProps.map((vp, i) => {
                const Icon = vp.icon;
                const isLarge = i === 0;
                return (
                  <motion.div
                    key={vp.title}
                    variants={i % 2 === 0 ? slideInLeft : slideInRight}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`relative group bg-[#111827] border border-white/8 rounded-2xl p-8 hover:border-[#6366F1]/30 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] ${
                      isLarge ? "md:col-span-1" : ""
                    }`}
                  >
                    <div
                      className="absolute top-0 right-0 w-32 h-32 bg-[#6366F1]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      data-atomic-id="apbw1xx"
                      data-atomic-instance={i} />
                    <div className="relative" data-atomic-id="apdaw2f" data-atomic-instance={i}>
                      <div
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#22D3EE]/10 border border-[#6366F1]/20 flex items-center justify-center mb-5"
                        data-atomic-id="a1yah12y"
                        data-atomic-instance={i}>
                        <Icon className="w-6 h-6 text-[#6366F1]" />
                      </div>
                      <h3
                        className="text-white font-bold text-xl mb-3 tracking-tight"
                        data-atomic-id="a14vig9g"
                        data-atomic-instance={i}>
                        {vp.title}
                      </h3>
                      <p
                        className="text-slate-400 leading-relaxed"
                        data-atomic-id="a1rnr2tn"
                        data-atomic-instance={i}>{vp.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── Social Proof / Testimonials ───────────────────────────────────── */}
      <section
        id="reviews"
        className="py-20 relative overflow-hidden"
        data-atomic-id="acihifk">
        <div
          className="absolute inset-0 pointer-events-none"
          data-atomic-id="a1lhff5t">
          <div
            className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#6366F1]/6 rounded-full blur-[100px]"
            data-atomic-id="apussh0" />
        </div>
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="a1liu9ab">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p
                className="text-[#22D3EE] text-sm font-semibold uppercase tracking-widest mb-3"
                data-atomic-id="am8kmvt">
                {t("testimonials.eyebrow")}
              </p>
              <h2
                className="text-4xl font-extrabold tracking-tight text-white mb-4"
                data-atomic-id="anjtyp1">
                {t("testimonials.heading")}
              </h2>
              <p
                className="text-slate-400 max-w-lg mx-auto text-pretty"
                data-atomic-id="am8kq8t">
                {t("testimonials.subtext")}
              </p>
            </motion.div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              data-atomic-id="a1ku9vmz">
              {testimonials.map((t_item, i) => (
                <motion.div
                  key={t_item.id}
                  variants={fadeInUp}
                  custom={i}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-[#111827] border border-white/8 rounded-2xl p-7 hover:border-[#6366F1]/30 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] flex flex-col"
                >
                  {/* Stars */}
                  <div
                    className="flex gap-0.5 mb-5"
                    data-atomic-id="al7wkri"
                    data-atomic-instance={i}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p
                    className="text-slate-300 text-sm leading-relaxed flex-1 mb-6"
                    data-atomic-id="a8p054d"
                    data-atomic-instance={i}>
                    &ldquo;{t_item.text}&rdquo;
                  </p>
                  <div
                    className="flex items-center gap-3 pt-5 border-t border-white/8"
                    data-atomic-id="alaq90i"
                    data-atomic-instance={i}>
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#6366F1] to-[#22D3EE] flex items-center justify-center flex-shrink-0"
                      data-atomic-id="a1kyskkl"
                      data-atomic-instance={i}>
                      <img
                        src={t_item.avatar}
                        alt={t_item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                        data-atomic-id="ad47caq"
                        data-atomic-instance={i} />
                    </div>
                    <div data-atomic-id="a1l07ep3" data-atomic-instance={i}>
                      <p
                        className="text-white text-sm font-semibold"
                        data-atomic-id="a2oxidz"
                        data-atomic-instance={i}>{t_item.name}</p>
                      <p
                        className="text-slate-400 text-xs"
                        data-atomic-id="a2oxk2h"
                        data-atomic-instance={i}>{t_item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section
        id="cta"
        className="py-20 relative overflow-hidden"
        data-atomic-id="awswpez">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="a6vjfwc">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#0EA5E9] p-12 md:p-16 text-center shadow-[0_32px_80px_rgba(99,102,241,0.3)]"
          >
            {/* Texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              data-atomic-id="a18v4q90" />
            <div
              className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
              data-atomic-id="a18wjkdi" />
            <div
              className="absolute bottom-0 left-0 w-64 h-64 bg-[#22D3EE]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
              data-atomic-id="a18xyei0" />

            <div className="relative" data-atomic-id="a18zd8mi">
              <motion.div variants={fadeInUp}>
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-medium mb-6"
                  data-atomic-id="a1p24uv3">
                  <Sparkles className="w-4 h-4" />
                  {t("cta.badge")}
                </span>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 text-balance"
              >
                {t("cta.heading")}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-white/80 text-lg max-w-xl mx-auto mb-8 text-pretty"
              >
                {t("cta.subtext")}
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#4F46E5] font-bold text-sm hover:bg-white/90 transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                >
                  {t("cta.button_primary")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/15 border border-white/30 text-white font-semibold text-sm hover:bg-white/25 transition-all duration-200"
                >
                  {t("cta.button_secondary")}
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/20"
              >
                {[
                  { icon: Shield, text: "Secure Checkout" },
                  { icon: Truck, text: "Free 2-Day Shipping" },
                  { icon: RotateCcw, text: "30-Day Returns" },
                ].map((badge, __atomicIdx) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.text}
                      className="flex items-center gap-2 text-white/80 text-sm"
                      data-atomic-id="akjmtd2"
                      data-atomic-instance={__atomicIdx}>
                      <Icon className="w-4 h-4" />
                      {badge.text}
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}