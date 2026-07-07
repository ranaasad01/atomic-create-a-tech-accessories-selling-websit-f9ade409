"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { ShoppingCart, Trash2, Heart, Plus, Minus, Tag, ArrowRight, Package, ChevronRight, X, Check, Truck, ShieldCheck } from 'lucide-react';
import { useTranslations } from "next-intl";

interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  category: string;
  inStock: boolean;
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "GaN 100W USB-C Charger",
    variant: "White / 3-Port",
    price: 59.99,
    originalPrice: 79.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/516szWmX2ZL._AC_UF894,1000_QL80_.jpg",
    category: "Chargers",
    inStock: true,
  },
  {
    id: "2",
    name: "MagSafe Braided USB-C Cable 2m",
    variant: "Midnight Black / 2m",
    price: 29.99,
    originalPrice: 39.99,
    quantity: 2,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MPL43?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1698168621764",
    category: "Cables",
    inStock: true,
  },
  {
    id: "3",
    name: "Studio-Grade Wireless Headphones",
    variant: "Matte Black",
    price: 149.99,
    originalPrice: 199.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/51N2OJQ8ggL._AC_UF894,1000_QL80_.jpg",
    category: "Audio",
    inStock: true,
  },
];

const SHIPPING_THRESHOLD = 75;
const SHIPPING_COST = 9.99;

export default function CartPage() {
  const t = useTranslations();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percent: number;
  } | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [discountSuccess, setDiscountSuccess] = useState(false);

  const validCodes: Record<string, number> = {
    TECH10: 10,
    GEAR20: 20,
    SAVE15: 15,
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const applyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (validCodes[code]) {
      setAppliedDiscount({ code, percent: validCodes[code] });
      setDiscountError("");
      setDiscountSuccess(true);
    } else {
      setAppliedDiscount(null);
      setDiscountError("Invalid code. Try TECH10, GEAR20, or SAVE15.");
      setDiscountSuccess(false);
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
    setDiscountSuccess(false);
    setDiscountError("");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = appliedDiscount
    ? (subtotal * appliedDiscount.percent) / 100
    : 0;
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = discountedSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = discountedSubtotal + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const savings = cartItems.reduce(
    (sum, item) =>
      sum + ((item.originalPrice ?? item.price) - item.price) * item.quantity,
    0
  );

  const isEmpty = cartItems.length === 0;

  return (
    <main className="min-h-screen bg-[#0F172A] pt-24 pb-20">
      {/* Page Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10"
      >
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-white transition-colors duration-200">
            Shop
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Cart</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Your Cart
          </h1>
          {!isEmpty && (
            <span className="px-3 py-1 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/30 text-[#818CF8] text-sm font-medium">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          )}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            /* Empty State */
            <motion.div
              key="empty"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-[#1E293B] border border-white/10 flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(99,102,241,0.15)]">
                  <ShoppingCart className="w-14 h-14 text-slate-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center">
                  <X className="w-5 h-5 text-[#818CF8]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Your cart is empty
              </h2>
              <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                Looks like you have not added anything yet. Browse our premium
                tech accessories and find something you love.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-semibold hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-105"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
            >
              {/* Left Column: Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Free shipping progress */}
                {shipping > 0 && (
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="p-4 rounded-xl bg-[#1E293B] border border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-[#22D3EE]" />
                      <p className="text-sm text-slate-300">
                        Add{" "}
                        <span className="text-white font-semibold">
                          ${(SHIPPING_THRESHOLD - discountedSubtotal).toFixed(2)}
                        </span>{" "}
                        more for free shipping
                      </p>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(
                            (discountedSubtotal / SHIPPING_THRESHOLD) * 100,
                            100
                          )}%`,
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] rounded-full"
                      />
                    </div>
                  </motion.div>
                )}

                {shipping === 0 && (
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-sm text-emerald-300 font-medium">
                      You qualify for free shipping on this order.
                    </p>
                  </motion.div>
                )}

                {/* Items list */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={fadeInUp}
                        layout
                        exit={{ opacity: 0, x: -40, transition: { duration: 0.3 } }}
                        className="group relative flex gap-4 p-4 rounded-2xl bg-[#1E293B] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
                      >
                        {/* Product Image */}
                        <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-[#0F172A] border border-white/10">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/images/tech-accessory-placeholder.jpg";
                            }}
                          />
                          {item.originalPrice && (
                            <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-[#6366F1] text-white text-[10px] font-bold">
                              SALE
                            </div>
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-xs text-[#22D3EE] font-medium mb-0.5 uppercase tracking-wide">
                                {item.category}
                              </p>
                              <h3 className="text-white font-semibold text-sm md:text-base leading-snug truncate">
                                {item.name}
                              </h3>
                              <p className="text-slate-500 text-xs mt-0.5">
                                {item.variant}
                              </p>
                            </div>
                            {/* Price */}
                            <div className="text-right flex-shrink-0">
                              <p className="text-white font-bold text-base">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              {item.originalPrice && (
                                <p className="text-slate-500 text-xs line-through">
                                  ${(item.originalPrice * item.quantity).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Actions Row */}
                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Stepper */}
                            <div className="flex items-center gap-1 bg-[#0F172A] rounded-lg border border-white/10 p-0.5">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                                className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </motion.button>
                              <span className="w-8 text-center text-white text-sm font-semibold">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </motion.button>
                            </div>

                            {/* Wishlist + Remove */}
                            <div className="flex items-center gap-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleWishlist(item.id)}
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                  wishlist.includes(item.id)
                                    ? "text-rose-400 bg-rose-500/10"
                                    : "text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                                }`}
                                aria-label="Save to wishlist"
                              >
                                <Heart
                                  className="w-4 h-4"
                                  fill={
                                    wishlist.includes(item.id)
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeItem(item.id)}
                                className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Continue Shopping */}
                <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 group"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
                    Continue Shopping
                  </Link>
                </motion.div>

                {/* Savings Banner */}
                {savings > 0 && (
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="p-4 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#6366F1]/20 flex items-center justify-center flex-shrink-0">
                      <Tag className="w-4 h-4 text-[#818CF8]" />
                    </div>
                    <p className="text-sm text-[#A5B4FC]">
                      You are saving{" "}
                      <span className="text-white font-bold">
                        ${savings.toFixed(2)}
                      </span>{" "}
                      on this order compared to original prices.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Right Column: Order Summary */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="lg:sticky lg:top-28"
              >
                <div className="rounded-2xl bg-[#1E293B] border border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_16px_48px_-12px_rgba(0,0,0,0.4)] overflow-hidden">
                  {/* Summary Header */}
                  <div className="px-6 py-5 border-b border-white/10">
                    <h2 className="text-lg font-bold text-white">
                      Order Summary
                    </h2>
                  </div>

                  <div className="px-6 py-5 space-y-4">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                      </span>
                      <span className="text-white font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Discount */}
                    {appliedDiscount && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-emerald-400 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          {appliedDiscount.code} ({appliedDiscount.percent}% off)
                        </span>
                        <span className="text-emerald-400 font-medium">
                          -${discountAmount.toFixed(2)}
                        </span>
                      </motion.div>
                    )}

                    {/* Shipping */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" />
                        Shipping
                      </span>
                      {shipping === 0 ? (
                        <span className="text-emerald-400 font-medium">Free</span>
                      ) : (
                        <span className="text-white font-medium">
                          ${shipping.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold text-base">Total</span>
                        <div className="text-right">
                          <p className="text-white font-bold text-xl">
                            ${total.toFixed(2)}
                          </p>
                          {savings + discountAmount > 0 && (
                            <p className="text-emerald-400 text-xs">
                              You save $
                              {(savings + discountAmount).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Discount Code Input */}
                    <div className="pt-1">
                      <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">
                        Discount Code
                      </label>
                      {appliedDiscount ? (
                        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-300 text-sm font-medium">
                              {appliedDiscount.code}
                            </span>
                          </div>
                          <button
                            onClick={removeDiscount}
                            className="text-slate-400 hover:text-white transition-colors duration-200"
                            aria-label="Remove discount code"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={discountCode}
                            onChange={(e) => {
                              setDiscountCode(e.target.value);
                              setDiscountError("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") applyDiscount();
                            }}
                            placeholder="Enter code"
                            className="flex-1 px-3 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/30 transition-all duration-200"
                          />
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={applyDiscount}
                            className="px-4 py-2.5 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/30 text-[#818CF8] text-sm font-semibold hover:bg-[#6366F1]/30 transition-all duration-200"
                          >
                            Apply
                          </motion.button>
                        </div>
                      )}
                      {discountError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-2"
                        >
                          {discountError}
                        </motion.p>
                      )}
                      {discountSuccess && !discountError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-emerald-400 text-xs mt-2"
                        >
                          Discount applied successfully.
                        </motion.p>
                      )}
                    </div>

                    {/* Checkout CTA */}
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 32px rgba(99,102,241,0.5)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0F172A] border border-white/5">
                        <ShieldCheck className="w-4 h-4 text-[#22D3EE] flex-shrink-0" />
                        <span className="text-slate-400 text-xs">
                          Secure checkout
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0F172A] border border-white/5">
                        <Package className="w-4 h-4 text-[#22D3EE] flex-shrink-0" />
                        <span className="text-slate-400 text-xs">
                          Easy returns
                        </span>
                      </div>
                    </div>

                    {/* Payment Icons */}
                    <div className="pt-1">
                      <p className="text-slate-600 text-xs text-center mb-2">
                        Accepted payment methods
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        {["VISA", "MC", "AMEX", "PayPal"].map((method) => (
                          <div
                            key={method}
                            className="px-2 py-1 rounded-md bg-[#0F172A] border border-white/10 text-slate-500 text-[10px] font-bold tracking-wide"
                          >
                            {method}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recently Viewed / You May Also Like */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-6 rounded-2xl bg-[#1E293B] border border-white/10 p-5"
                >
                  <h3 className="text-sm font-semibold text-white mb-4">
                    You May Also Like
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        id: "r1",
                        name: "AirPods Pro Silicone Case",
                        price: 19.99,
                        image: "http://www.elago.com/cdn/shop/products/APP2SC-HANG-LV.jpg?v=1665596426",
                        slug: "airpods-pro-silicone-case",
                      },
                      {
                        id: "r2",
                        name: "Portable 20,000mAh Power Bank",
                        price: 49.99,
                        image: "/images/portable-power-bank-20000mah.jpg",
                        slug: "portable-power-bank",
                      },
                    ].map((rec) => (
                      <Link
                        key={rec.id}
                        href={`/shop/${rec.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#0F172A] border border-white/10 flex-shrink-0">
                          <img
                            src={rec.image}
                            alt={rec.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/images/tech-accessory-placeholder.jpg";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-300 text-xs font-medium group-hover:text-white transition-colors duration-200 truncate">
                            {rec.name}
                          </p>
                          <p className="text-[#818CF8] text-xs font-bold mt-0.5">
                            ${rec.price.toFixed(2)}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors duration-200 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}