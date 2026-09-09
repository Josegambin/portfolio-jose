// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { portfolio } from "@/data/portfolio";

const navItems = [
  { label: "Sobre mí", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Juegos", href: "#games" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveSection(href.slice(1));
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "glass border-b border-zinc-800/50 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <motion.a
          href="#about"
          className="text-xl font-bold relative group"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#about");
          }}
        >
          <span className="gradient-text text-2xl">{portfolio.shortName}</span>
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className={`text-sm transition relative group ${
                activeSection === item.href.slice(1)
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
              aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-blue-500"
                initial={false}
                animate={{ width: activeSection === item.href.slice(1) ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
          
          {/* Social Icons con SVG personalizados */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 border-l border-zinc-800 pl-4"
          >
            {[
              { icon: GithubIcon, href: portfolio.github, label: "GitHub" },
              { icon: LinkedinIcon, href: `https://${portfolio.linkedin}`, label: "LinkedIn" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition p-2 rounded-lg hover:bg-zinc-800/50"
                aria-label={social.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="btn-primary text-white text-sm px-5 py-2 rounded-full"
            onClick={() => handleNavClick("#contact")}
          >
            Contactar
          </motion.button>
          <motion.a
            href="/cv-jose-gambin.pdf"
            download
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition"
            aria-label="Descargar CV en PDF"
          >
            <Download className="w-4 h-4" />
            CV
          </motion.a>
        </div>

        {/* Mobile Navigation Toggle */}
        <motion.button
          className="md:hidden text-zinc-400 hover:text-white transition p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 w-full glass border-b border-zinc-800/50 overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col p-6 space-y-4"
              >
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className={`transition py-3 px-4 rounded-lg text-center ${
                      activeSection === item.href.slice(1)
                        ? "text-white bg-blue-500/10"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                    }`}
                    aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center gap-6 pt-4 border-t border-zinc-800"
                >
                  {[
                    { icon: GithubIcon, href: portfolio.github },
                    { icon: LinkedinIcon, href: `https://${portfolio.linkedin}` },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition p-2"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="btn-primary text-white py-3 rounded-full w-full font-medium"
                  onClick={() => handleNavClick("#contact")}
                >
                  Contactar
                </motion.button>
                <motion.a
                  href="/cv-jose-gambin.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 text-zinc-300 hover:text-white transition py-3"
                >
                  <Download className="w-4 h-4" />
                  Descargar CV
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}