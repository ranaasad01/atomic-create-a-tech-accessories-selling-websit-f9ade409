"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageSquare, Headphones, Package, RotateCcw } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_EMAIL, APP_PHONE } from "@/lib/data";
import { useTranslations } from "next-intl";

const contactReasons = [
  { id: "order", label: "Order Support", icon: Package },
  { id: "returns", label: "Returns & Refunds", icon: RotateCcw },
  { id: "technical", label: "Technical Help", icon: Headphones },
  { id: "general", label: "General Inquiry", icon: MessageSquare },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: APP_EMAIL,
    detail: "We reply within 24 hours",
    href: `mailto:${APP_EMAIL}`,
    accent: "#6366F1",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: APP_PHONE,
    detail: "Mon to Fri, 9am to 6pm EST",
    href: `tel:${APP_PHONE}`,
    accent: "#22D3EE",
  },
  {
    icon: MapPin,
    label: "Our Office",
    value: "340 Pine Street, Suite 800",
    detail: "San Francisco, CA 94104",
    href: "#",
    accent: "#6366F1",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri: 9am – 6pm EST",
    detail: "Sat: 10am – 4pm EST",
    href: "#",
    accent: "#22D3EE",
  },
];

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3 to 5 business days. Express shipping (1 to 2 days) is available at checkout for an additional fee. Free standard shipping on orders over $50.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day hassle-free return policy. Items must be in original condition with packaging. Initiate a return from your order history or contact our support team.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 40 countries worldwide. International shipping rates and delivery times vary by destination and are calculated at checkout.",
  },
  {
    question: "Are your products covered by warranty?",
    answer:
      "All products come with a minimum 12-month manufacturer warranty. Premium products include an extended 24-month warranty. Warranty claims can be filed through our support portal.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Absolutely. Once your order ships, you will receive a tracking number via email. You can also view real-time tracking from your account dashboard.",
  },
];

interface FormState {
  name: string;
  email: string;
  reason: string;
  orderNumber: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const t = useTranslations();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    reason: "general",
    orderNumber: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReasonSelect = (id: string) => {
    setForm((prev) => ({ ...prev, reason: id }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    await new Promise((res) => setTimeout(res, 1400));
    setSubmitStatus("success");
  };

  const handleReset = () => {
    setForm({ name: "", email: "", reason: "general", orderNumber: "", message: "" });
    setSubmitStatus("idle");
  };

  return (
    <main className="min-h-screen bg-[#0F172A] text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#6366F1]/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-[#22D3EE]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-5"
          >
            <motion.div variants={scaleIn}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/30 text-[#818CF8] text-sm font-medium">
                <MessageSquare className="w-3.5 h-3.5" />
                Get in Touch
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance leading-tight"
            >
              We are here to{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#22D3EE] bg-clip-text text-transparent">
                help you
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-lg leading-relaxed max-w-xl text-pretty"
            >
              Have a question about your order, a product, or just want to say hello? Our team is ready to assist you every step of the way.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  variants={fadeInUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group relative flex flex-col gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.accent}20`, border: `1px solid ${item.accent}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-white font-semibold text-sm leading-snug">{item.value}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{item.detail}</p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Content: Form + Map/Extra */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]">
              <h2 className="text-2xl font-bold tracking-tight mb-1">Send us a message</h2>
              <p className="text-slate-400 text-sm mb-8">Fill out the form and we will get back to you within one business day.</p>

              {submitStatus === "success" ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center gap-4 py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold">Message sent!</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Thanks for reaching out. Our team will respond to{" "}
                    <span className="text-white font-medium">{form.email || "your email"}</span> within 24 hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleReset}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm font-medium transition-all duration-200"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Reason selector */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">What can we help with?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {contactReasons.map((r) => {
                        const Icon = r.icon;
                        const selected = form.reason === r.id;
                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => handleReasonSelect(r.id)}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all duration-200 ${
                              selected
                                ? "bg-[#6366F1]/20 border-[#6366F1]/50 text-[#818CF8]"
                                : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {r.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Full Name <span className="text-[#6366F1]">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#6366F1]/60 focus:bg-white/8 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Email Address <span className="text-[#6366F1]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#6366F1]/60 focus:bg-white/8 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Order number (conditional) */}
                  {(form.reason === "order" || form.reason === "returns") && (
                    <motion.div
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                    >
                      <label htmlFor="orderNumber" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Order Number
                      </label>
                      <input
                        id="orderNumber"
                        name="orderNumber"
                        type="text"
                        value={form.orderNumber}
                        onChange={handleChange}
                        placeholder="TGS-XXXXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#6366F1]/60 focus:bg-white/8 transition-all duration-200"
                      />
                    </motion.div>
                  )}

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Message <span className="text-[#6366F1]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#6366F1]/60 focus:bg-white/8 transition-all duration-200 resize-none"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={submitStatus === "loading"}
                    whileHover={{ scale: submitStatus === "loading" ? 1 : 1.02 }}
                    whileTap={{ scale: submitStatus === "loading" ? 1 : 0.97 }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] hover:from-[#818CF8] hover:to-[#6366F1] text-white font-semibold text-sm shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_28px_rgba(99,102,241,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitStatus === "loading" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right column: Live chat promo + response time */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Live chat card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#6366F1]/20 to-[#22D3EE]/10 border border-[#6366F1]/25 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#6366F1]/25 border border-[#6366F1]/30 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-[#818CF8]" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Live Chat</p>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online now
                  </span>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Chat with a real support agent in under 2 minutes. Available Monday through Friday, 9am to 6pm EST.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 rounded-xl bg-[#6366F1]/30 hover:bg-[#6366F1]/45 border border-[#6366F1]/40 text-[#818CF8] font-medium text-sm transition-all duration-200"
              >
                Start Live Chat
              </motion.button>
            </div>

            {/* Response time stats */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]">
              <h3 className="font-semibold text-white text-sm mb-4">Our Response Times</h3>
              <div className="flex flex-col gap-3">
                {[
                  { channel: "Live Chat", time: "Under 2 min", bar: 95 },
                  { channel: "Email", time: "Under 24 hrs", bar: 75 },
                  { channel: "Phone", time: "Under 5 min", bar: 88 },
                ].map((item) => (
                  <div key={item.channel} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{item.channel}</span>
                      <span className="text-white font-medium">{item.time}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Satisfaction badge */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366F1]/20 to-[#22D3EE]/20 border border-white/10 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#22D3EE] bg-clip-text text-transparent">98%</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Customer Satisfaction</p>
                  <p className="text-slate-400 text-xs leading-relaxed mt-0.5">
                    Based on 4,200+ support interactions in the last 90 days.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4"
          >
            <motion.div variants={fadeInUp} className="text-center mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/25 text-[#22D3EE] text-sm font-medium mb-4">
                Quick Answers
              </span>
              <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Can not find what you are looking for? Send us a message above.
              </p>
            </motion.div>

            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-white/5 transition-colors duration-200"
                >
                  <span className="font-medium text-white text-sm">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-slate-400 text-lg leading-none"
                  >
                    +
                  </motion.span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="px-6 pb-5"
                  >
                    <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}