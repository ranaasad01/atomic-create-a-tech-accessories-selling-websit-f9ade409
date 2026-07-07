"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { useTranslations } from "next-intl";
import { Check, ChevronRight, CreditCard, Lock, Package, Truck, Zap, AlertCircle, ShoppingBag, ArrowLeft, Star } from 'lucide-react';

// ─── Mock cart data ───────────────────────────────────────────────────────────
const cartItems = [
  {
    id: "1",
    name: "MagSafe Braided USB-C Cable 2m",
    category: "Cables",
    price: 29.99,
    originalPrice: 39.99,
    qty: 1,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MPL43?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1698168621764",
  },
  {
    id: "2",
    name: "GaN 100W USB-C Charger",
    category: "Chargers",
    price: 59.99,
    originalPrice: 79.99,
    qty: 1,
    image: "https://m.media-amazon.com/images/I/516szWmX2ZL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "3",
    name: "Studio-Grade Wireless Headphones",
    category: "Audio",
    price: 149.99,
    originalPrice: 199.99,
    qty: 1,
    image: "https://m.media-amazon.com/images/I/51N2OJQ8ggL._AC_UF894,1000_QL80_.jpg",
  },
];

const deliveryOptions = [
  {
    id: "standard",
    label: "Standard Shipping",
    desc: "5-7 business days",
    price: 0,
    icon: Package,
  },
  {
    id: "express",
    label: "Express Shipping",
    desc: "2-3 business days",
    price: 9.99,
    icon: Truck,
  },
  {
    id: "nextday",
    label: "Next-Day Delivery",
    desc: "Order before 2 PM",
    price: 24.99,
    icon: Zap,
  },
];

// ─── Inline variants ──────────────────────────────────────────────────────────
const inputFocusVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const confirmVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatPrice(n: number) {
  return (n ?? 0).toFixed(2);
}

// ─── Sub-components (inline) ──────────────────────────────────────────────────

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  half?: boolean;
  maxLength?: number;
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  half,
  maxLength,
}: FieldProps) {
  return (
    <div className={half ? "col-span-1" : "col-span-2"}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        autoComplete="off"
        className={`w-full bg-white/5 border ${
          error ? "border-red-500/60" : "border-white/10"
        } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6366F1]/60 focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const t = useTranslations();

  // Shipping form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("United States");

  // Delivery
  const [delivery, setDelivery] = useState("standard");

  // Payment state
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // Promo
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Confirmation
  const [submitted, setSubmitted] = useState(false);

  // Derived totals
  const selectedDelivery =
    deliveryOptions.find((d) => d.id === delivery) ?? deliveryOptions[0];
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = selectedDelivery?.price ?? 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  // Card number formatter
  function handleCardNumber(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  }

  // Expiry formatter
  function handleExpiry(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      setCardExpiry(digits.slice(0, 2) + "/" + digits.slice(2));
    } else {
      setCardExpiry(digits);
    }
  }

  // Promo handler
  function applyPromo() {
    if (promo.trim().toUpperCase() === "TECH10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoApplied(false);
      setPromoError("Invalid promo code. Try TECH10.");
    }
  }

  // Validation
  function validate() {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "First name is required.";
    if (!lastName.trim()) e.lastName = "Last name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "A valid email is required.";
    if (!address.trim()) e.address = "Street address is required.";
    if (!city.trim()) e.city = "City is required.";
    if (!state.trim()) e.state = "State is required.";
    if (!zip.trim()) e.zip = "ZIP code is required.";
    if (!cardName.trim()) e.cardName = "Name on card is required.";
    if (cardNumber.replace(/\s/g, "").length < 16)
      e.cardNumber = "Enter a valid 16-digit card number.";
    if (!cardExpiry || cardExpiry.length < 5)
      e.cardExpiry = "Enter a valid expiry (MM/YY).";
    if (!cardCvc || cardCvc.length < 3) e.cardCvc = "Enter a valid CVC.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // ── Confirmation screen ──────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 py-32">
        <motion.div
          variants={confirmVariant}
          initial="hidden"
          animate="visible"
          className="max-w-lg w-full text-center"
        >
          {/* Success icon */}
          <div className="relative mx-auto w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6366F1] to-[#22D3EE] opacity-20 blur-xl" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#6366F1] to-[#22D3EE] flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.5)]">
              <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Order Confirmed!
          </h1>
          <p className="text-slate-400 leading-relaxed mb-2">
            Thank you, {firstName || "valued customer"}. Your order has been
            placed successfully.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            A confirmation email will be sent to{" "}
            <span className="text-[#22D3EE]">{email || "your inbox"}</span>.
          </p>

          {/* Order summary card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Order Summary
            </p>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{item.name}</span>
                  <span className="text-sm text-white font-medium">
                    ${formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">
              <span className="text-sm font-semibold text-white">Total Paid</span>
              <span className="text-lg font-bold text-[#6366F1]">
                ${formatPrice(total)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#22D3EE] text-white font-semibold text-sm hover:opacity-90 transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm hover:bg-white/10 transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Main checkout layout ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#6366F1]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-[#22D3EE]/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Page header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Shop
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Checkout
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Complete your order securely. All fields are required unless marked
            optional.
          </p>
        </motion.div>

        {/* Progress steps */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 mb-10 overflow-x-auto pb-1"
        >
          {["Shipping", "Delivery", "Payment", "Review"].map((step, i) => (
            <div key={step} className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                    i < 3
                      ? "bg-gradient-to-br from-[#6366F1] to-[#22D3EE] border-transparent text-white"
                      : "bg-white/5 border-white/10 text-slate-500"
                  }`}
                >
                  {i < 3 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span
                  className={`text-sm font-medium ${
                    i < 3 ? "text-white" : "text-slate-500"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < 3 && (
                <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </motion.div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* ── Left column: forms ─────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping address */}
              <motion.section
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#22D3EE]/20 border border-white/10 flex items-center justify-center">
                    <Package className="w-4 h-4 text-[#6366F1]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      Shipping Address
                    </h2>
                    <p className="text-xs text-slate-500">
                      Where should we send your order?
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="First Name"
                    id="firstName"
                    placeholder="Alex"
                    value={firstName}
                    onChange={setFirstName}
                    error={errors.firstName}
                    half
                  />
                  <Field
                    label="Last Name"
                    id="lastName"
                    placeholder="Johnson"
                    value={lastName}
                    onChange={setLastName}
                    error={errors.lastName}
                    half
                  />
                  <Field
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={setEmail}
                    error={errors.email}
                  />
                  <Field
                    label="Phone (optional)"
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={setPhone}
                    half
                  />
                  <Field
                    label="Country"
                    id="country"
                    placeholder="United States"
                    value={country}
                    onChange={setCountry}
                    half
                  />
                  <Field
                    label="Street Address"
                    id="address"
                    placeholder="123 Main Street"
                    value={address}
                    onChange={setAddress}
                    error={errors.address}
                  />
                  <Field
                    label="Apt / Suite (optional)"
                    id="apt"
                    placeholder="Apt 4B"
                    value={apt}
                    onChange={setApt}
                    half
                  />
                  <Field
                    label="City"
                    id="city"
                    placeholder="San Francisco"
                    value={city}
                    onChange={setCity}
                    error={errors.city}
                    half
                  />
                  <Field
                    label="State"
                    id="state"
                    placeholder="CA"
                    value={state}
                    onChange={setState}
                    error={errors.state}
                    half
                  />
                  <Field
                    label="ZIP Code"
                    id="zip"
                    placeholder="94102"
                    value={zip}
                    onChange={setZip}
                    error={errors.zip}
                    half
                    maxLength={10}
                  />
                </div>
              </motion.section>

              {/* Delivery method */}
              <motion.section
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#22D3EE]/20 border border-white/10 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-[#6366F1]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      Delivery Method
                    </h2>
                    <p className="text-xs text-slate-500">
                      Choose how fast you want your gear.
                    </p>
                  </div>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {deliveryOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = delivery === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        type="button"
                        variants={scaleIn}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setDelivery(opt.id)}
                        className={`relative flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all duration-200 ${
                          isSelected
                            ? "border-[#6366F1]/60 bg-[#6366F1]/10 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                            : "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5"
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-br from-[#6366F1] to-[#22D3EE] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                        )}
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? "bg-gradient-to-br from-[#6366F1] to-[#22D3EE]"
                              : "bg-white/10"
                          }`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              isSelected ? "text-white" : "text-slate-300"
                            }`}
                          >
                            {opt.label}
                          </p>
                          <p className="text-xs text-slate-500">{opt.desc}</p>
                        </div>
                        <p
                          className={`text-sm font-bold ${
                            isSelected ? "text-[#22D3EE]" : "text-slate-400"
                          }`}
                        >
                          {opt.price === 0 ? "Free" : `$${formatPrice(opt.price)}`}
                        </p>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </motion.section>

              {/* Payment info */}
              <motion.section
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] overflow-hidden"
              >
                {/* Glassmorphism accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#6366F1]/10 to-transparent rounded-2xl pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#22D3EE]/20 border border-white/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-[#6366F1]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      Payment Information
                    </h2>
                    <p className="text-xs text-slate-500">
                      Mock fields only. No real payment is processed.
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-medium">
                      Secure
                    </span>
                  </div>
                </div>

                {/* Mock card visual */}
                <div className="relative mb-6 h-44 rounded-2xl bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#22D3EE] p-6 overflow-hidden shadow-[0_8px_32px_rgba(99,102,241,0.4)]">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 right-4 w-32 h-32 rounded-full border border-white/30" />
                    <div className="absolute top-8 right-8 w-20 h-20 rounded-full border border-white/20" />
                    <div className="absolute -bottom-4 -left-4 w-40 h-40 rounded-full border border-white/10" />
                  </div>
                  <div className="relative flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                      <Zap className="w-8 h-8 text-white/80" />
                      <div className="flex gap-1">
                        <div className="w-8 h-5 rounded bg-white/20 backdrop-blur-sm" />
                        <div className="w-8 h-5 rounded bg-white/10 backdrop-blur-sm" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-1 font-mono tracking-widest">
                        {cardNumber
                          ? cardNumber.padEnd(19, "•").slice(0, 19)
                          : "•••• •••• •••• ••••"}
                      </p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/40 text-xs uppercase tracking-widest">
                            Card Holder
                          </p>
                          <p className="text-white text-sm font-semibold tracking-wide">
                            {cardName || "YOUR NAME"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/40 text-xs uppercase tracking-widest">
                            Expires
                          </p>
                          <p className="text-white text-sm font-semibold">
                            {cardExpiry || "MM/YY"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card fields */}
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Name on Card"
                    id="cardName"
                    placeholder="Alex Johnson"
                    value={cardName}
                    onChange={setCardName}
                    error={errors.cardName}
                  />
                  <div className="col-span-2">
                    <label
                      htmlFor="cardNumber"
                      className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5"
                    >
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => handleCardNumber(e.target.value)}
                      maxLength={19}
                      autoComplete="off"
                      className={`w-full bg-white/5 border ${
                        errors.cardNumber ? "border-red-500/60" : "border-white/10"
                      } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6366F1]/60 focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200 font-mono tracking-widest`}
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="cardExpiry"
                      className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5"
                    >
                      Expiry Date
                    </label>
                    <input
                      id="cardExpiry"
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => handleExpiry(e.target.value)}
                      maxLength={5}
                      autoComplete="off"
                      className={`w-full bg-white/5 border ${
                        errors.cardExpiry ? "border-red-500/60" : "border-white/10"
                      } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6366F1]/60 focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200`}
                    />
                    {errors.cardExpiry && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.cardExpiry}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="cardCvc"
                      className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5"
                    >
                      CVC
                    </label>
                    <input
                      id="cardCvc"
                      type="text"
                      inputMode="numeric"
                      placeholder="•••"
                      value={cardCvc}
                      onChange={(e) =>
                        setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      maxLength={4}
                      autoComplete="off"
                      className={`w-full bg-white/5 border ${
                        errors.cardCvc ? "border-red-500/60" : "border-white/10"
                      } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6366F1]/60 focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200`}
                    />
                    {errors.cardCvc && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.cardCvc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Accepted cards note */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3 h-3" />
                  <span>
                    256-bit SSL encryption. We never store your card details.
                  </span>
                </div>
              </motion.section>
            </div>

            {/* ── Right column: order summary (sticky) ───────────────────── */}
            <motion.aside
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="lg:sticky lg:top-28 space-y-4"
            >
              {/* Cart items */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]">
                <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#6366F1]" />
                  Order Summary
                  <span className="ml-auto text-xs text-slate-500 font-normal">
                    {cartItems.length} items
                  </span>
                </h2>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white leading-snug line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.category}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-slate-500">
                            Qty: {item.qty}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {item.originalPrice && (
                              <span className="text-xs text-slate-600 line-through">
                                ${formatPrice(item.originalPrice)}
                              </span>
                            )}
                            <span className="text-sm font-bold text-white">
                              ${formatPrice(item.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo code */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Promo Code
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. TECH10"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6366F1]/60 focus:ring-2 focus:ring-[#6366F1]/20 transition-all duration-200"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={applyPromo}
                    className="px-4 py-2.5 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/30 text-[#6366F1] text-sm font-semibold hover:bg-[#6366F1]/30 transition-all duration-200"
                  >
                    Apply
                  </motion.button>
                </div>
                <AnimatePresence>
                  {promoApplied && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-2 text-xs text-emerald-400 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      10% discount applied!
                    </motion.p>
                  )}
                  {promoError && !promoApplied && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-2 text-xs text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {promoError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Price breakdown */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">${formatPrice(subtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400">Promo (TECH10)</span>
                    <span className="text-emerald-400">
                      -${formatPrice(discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Shipping</span>
                  <span className="text-white">
                    {shipping === 0 ? "Free" : `$${formatPrice(shipping)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tax (8%)</span>
                  <span className="text-white">${formatPrice(tax)}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-base font-bold text-white">Total</span>
                  <span className="text-xl font-bold text-[#6366F1]">
                    ${formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Lock, label: "Secure Payment" },
                  { icon: Truck, label: "Fast Delivery" },
                  { icon: Star, label: "Top Rated" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 bg-white/3 border border-white/8 rounded-xl p-3 text-center"
                  >
                    <Icon className="w-4 h-4 text-[#6366F1]" />
                    <span className="text-xs text-slate-500 leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#22D3EE] text-white font-bold text-base shadow-[0_0_24px_rgba(99,102,241,0.4)] hover:shadow-[0_0_32px_rgba(99,102,241,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Place Order — ${formatPrice(total)}
              </motion.button>

              <p className="text-center text-xs text-slate-600 leading-relaxed">
                By placing your order you agree to our{" "}
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </motion.aside>
          </div>
        </form>
      </div>
    </div>
  );
}