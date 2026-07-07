"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { APP_NAME, APP_EMAIL, APP_PHONE } from "@/lib/data";
import { Mail, Phone, MapPin, MessageCircle as Twitter, Code2 as Github, Briefcase as Linkedin, Globe as Facebook, Zap } from 'lucide-react';
import { useTranslations } from "next-intl";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Cables", href: "/shop?category=cables" },
    { label: "Chargers", href: "/shop?category=chargers" },
    { label: "Cases", href: "/shop?category=cases" },
    { label: "Audio", href: "/shop?category=audio" },
    { label: "Peripherals", href: "/shop?category=peripherals" },
  ],
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/about-us" },
    { label: "Press", href: "/about-us" },
  ],
  support: [
    { label: "FAQ", href: "/contact" },
    { label: "Shipping Policy", href: "/contact" },
    { label: "Returns", href: "/contact" },
    { label: "Track Order", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
];

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <footer className="relative bg-[#080E1A] border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-64 bg-[#6366F1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-[#22D3EE]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#22D3EE] flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.4)] group-hover:shadow-[0_0_24px_rgba(99,102,241,0.6)] transition-all duration-300">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${APP_EMAIL}`}
                className="flex items-center gap-2 text-slate-400 hover:text-[#22D3EE] text-sm transition-colors duration-200"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                {APP_EMAIL}
              </a>
              <a
                href={`tel:${APP_PHONE}`}
                className="flex items-center gap-2 text-slate-400 hover:text-[#22D3EE] text-sm transition-colors duration-200"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                {APP_PHONE}
              </a>
              <span className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                San Francisco, CA 94105
              </span>
            </div>
          </motion.div>

          {/* Shop links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              {t("footer.shop")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              {t("footer.company")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              {t("footer.support")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-500 text-sm">
            {t("footer.copyright", { year: "2025", name: APP_NAME })}
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}