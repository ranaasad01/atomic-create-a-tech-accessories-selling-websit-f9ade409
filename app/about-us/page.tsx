"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { useTranslations } from "next-intl";
import { Zap, Shield, Truck, HeartHandshake, Users, Award, Globe, ArrowRight, CheckCircle, Star, Briefcase as Linkedin, MessageCircle as Twitter } from 'lucide-react';
import Link from "next/link";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "500+", label: "Products Listed" },
  { value: "4.9", label: "Average Rating" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description:
      "Every product in our catalog passes rigorous quality checks. We partner only with manufacturers who meet our strict standards for materials, durability, and performance.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Orders placed before 3 PM ship the same day. We offer free two-day shipping on all orders over $49, with real-time tracking from warehouse to your door.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Care",
    description:
      "Our support team is available seven days a week. Whether you need help choosing a product or resolving an issue, we respond within two hours.",
  },
  {
    icon: Globe,
    title: "Sustainable Sourcing",
    description:
      "We prioritize eco-conscious packaging and work with suppliers who share our commitment to reducing environmental impact across the supply chain.",
  },
];

const team = [
  {
    name: "Aria Chen",
    role: "Co-Founder & CEO",
    bio: "Former Apple hardware engineer with 12 years building consumer electronics. Aria founded TechGear to make premium accessories accessible to everyone.",
    image: "/images/team-aria-chen-ceo.jpg",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Marcus Webb",
    role: "Co-Founder & CTO",
    bio: "Ex-Google infrastructure lead. Marcus oversees our e-commerce platform, ensuring a fast, secure, and seamless shopping experience at every touchpoint.",
    image: "/images/team-marcus-webb-cto.jpg",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Sofia Reyes",
    role: "Head of Product",
    bio: "Product designer turned buyer. Sofia curates our catalog, spending hundreds of hours testing accessories before a single unit reaches our shelves.",
    image: "/images/team-sofia-reyes-product.jpg",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "James Okafor",
    role: "Head of Customer Experience",
    bio: "Passionate about people. James built our support team from the ground up and maintains our industry-leading 98% satisfaction score.",
    image: "/images/team-james-okafor-cx.jpg",
    twitter: "#",
    linkedin: "#",
  },
];

const milestones = [
  {
    year: "2019",
    title: "Founded in San Francisco",
    description: "Aria and Marcus launched TechGear from a garage with 12 SKUs and a mission to cut through the noise of low-quality accessories.",
  },
  {
    year: "2020",
    title: "First 10,000 Customers",
    description: "Word-of-mouth growth drove us past 10,000 orders in our first full year, with a 4.8-star average across all product lines.",
  },
  {
    year: "2021",
    title: "Expanded to 300+ Products",
    description: "We broadened our catalog to cover audio, storage, and peripherals, partnering with 40 vetted manufacturers across Asia and Europe.",
  },
  {
    year: "2022",
    title: "Launched Same-Day Shipping",
    description: "Opened our first fulfillment center in Chicago, enabling same-day dispatch for 80% of US orders placed before 3 PM.",
  },
  {
    year: "2023",
    title: "50,000 Happy Customers",
    description: "Crossed the 50K customer milestone and launched our loyalty program, rewarding our most dedicated community members.",
  },
  {
    year: "2024",
    title: "Going Global",
    description: "Expanded shipping to 35 countries and introduced multi-language support, bringing premium tech accessories to customers worldwide.",
  },
];

const perks = [
  "Free returns within 30 days, no questions asked",
  "Two-year warranty on all branded accessories",
  "Exclusive member pricing through our loyalty program",
  "Expert buying guides updated every month",
  "Carbon-neutral shipping on every order",
  "Dedicated B2B account managers for bulk orders",
];

export default function AboutUsPage() {
  return (
    <main className="bg-[#0F172A] text-white min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#6366F1]/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-[#22D3EE]/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#22D3EE] flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.5)]">
                <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium text-[#22D3EE] tracking-wide uppercase">
                Our Story
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1] mb-6"
            >
              Built by tech lovers,{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#22D3EE] bg-clip-text text-transparent">
                for tech lovers
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-400 leading-relaxed max-w-2xl mb-10"
            >
              TechGear Store was born from frustration. Too many accessories looked great in photos but failed within weeks. We set out to change that by curating only the products we would use ourselves, backed by real testing and honest reviews.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-semibold text-sm shadow-[0_0_24px_rgba(99,102,241,0.4)] hover:shadow-[0_0_32px_rgba(99,102,241,0.6)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Browse the Store
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[#6366F1] to-[#22D3EE] bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission split */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6366F1] mb-4">
              Our Mission
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance leading-tight mb-6">
              Accessories that actually last
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              The tech accessories market is flooded with products that look identical but perform worlds apart. Our mission is simple: remove the guesswork. Every item in our store has been tested by our team, rated by real customers, and held to a standard we would not compromise on.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              We believe premium quality should not mean premium prices. By working directly with manufacturers and cutting out unnecessary middlemen, we pass the savings on to you without sacrificing an ounce of quality.
            </p>
            <ul className="flex flex-col gap-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-[#22D3EE] flex-shrink-0 mt-0.5" />
                  {perk}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10">
              <img
                src="/images/tech-accessories-workspace-flat-lay.jpg"
                alt="Curated tech accessories laid out on a clean workspace"
                className="w-full h-80 lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#1E293B] border border-white/10 rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-400">
                Rated <span className="text-white font-semibold">4.9 / 5</span> by 50,000+ customers
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6366F1] mb-3">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              The principles behind every decision
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-[#1E293B]/60 border border-white/8 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] hover:border-[#6366F1]/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#22D3EE]/10 border border-[#6366F1]/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#6366F1]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{val.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{val.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6366F1] mb-3">
              Our Journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Five years of building something we are proud of
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#6366F1]/60 via-[#22D3EE]/30 to-transparent hidden sm:block" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-10"
            >
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  variants={fadeInUp}
                  className="sm:pl-16 relative"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-[#1E293B] border border-[#6366F1]/40 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.2)] hidden sm:flex">
                    <span className="text-[10px] font-bold text-[#6366F1]">{m.year}</span>
                  </div>
                  <div className="bg-[#1E293B]/40 border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-[#22D3EE] bg-[#22D3EE]/10 px-2.5 py-1 rounded-full sm:hidden">
                        {m.year}
                      </span>
                      <h3 className="font-semibold text-white">{m.title}</h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{m.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6366F1] mb-3">
              The Team
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Meet the people behind TechGear
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              A small, focused team with deep roots in hardware, software, and customer experience. We care about the products we sell because we use them every day.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group bg-[#1E293B]/60 border border-white/8 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.2)] hover:border-[#6366F1]/30 transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white mb-0.5">{member.name}</h3>
                  <p className="text-xs text-[#22D3EE] font-medium mb-3">{member.role}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={member.twitter}
                      aria-label={`${member.name} on Twitter`}
                      className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#22D3EE] hover:border-[#22D3EE]/30 transition-all duration-200"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.linkedin}
                      aria-label={`${member.name} on LinkedIn`}
                      className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#6366F1] hover:border-[#6366F1]/30 transition-all duration-200"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards / trust signals */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_64px_-16px_rgba(0,0,0,0.5)]">
              <img
                src="/images/tech-team-office-collaboration.jpg"
                alt="TechGear team collaborating in the office"
                className="w-full h-72 lg:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/20 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6366F1] mb-4">
              Recognition
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Trusted by customers and recognized by the industry
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              We have been honored to receive recognition from leading tech publications and consumer advocacy groups. But the award we value most is a five-star review from a customer who found exactly what they needed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Award, label: "Best Tech Retailer 2023", sub: "TechRadar Editors Choice" },
                { icon: Star, label: "Top Rated Seller", sub: "Trustpilot 2022 & 2023" },
                { icon: Users, label: "50K+ Community Members", sub: "Loyalty Program" },
                { icon: Shield, label: "Verified Secure Checkout", sub: "PCI DSS Level 1" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 bg-[#1E293B]/40 border border-white/8 rounded-xl p-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1]/20 to-[#22D3EE]/10 border border-[#6366F1]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#6366F1]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl overflow-hidden border border-[#6366F1]/30 bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-12 text-center shadow-[0_0_80px_rgba(99,102,241,0.15)]"
          >
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#6366F1]/15 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#22D3EE] flex items-center justify-center mx-auto mb-6 shadow-[0_0_24px_rgba(99,102,241,0.5)]">
                <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Ready to upgrade your setup?
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto">
                Browse over 500 curated accessories, backed by our two-year warranty and 30-day hassle-free returns. Your perfect setup is a few clicks away.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-semibold text-sm shadow-[0_0_24px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  Talk to Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}