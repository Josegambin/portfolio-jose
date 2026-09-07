// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";

const navItems = [
  { label: "Sobre mí", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#about"
          className="text-xl font-bold relative group"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#about");
          }}
        >
          <span className="gradient-text text-2xl">José Gambín</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-zinc-400 hover:text-white transition relative group"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          
          {/* Social Icons con SVG personalizados */}
          <div className="flex items-center gap-3 border-l border-zinc-800 pl-4">
            <a
              href="https://github.com/Josegambin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition"
              aria-label="Twitter"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
          </div>

          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm px-5 py-2 rounded-full transition-all hover:scale-105"
            onClick={() => handleNavClick("#contact")}
          >
            Contactar
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-white transition p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-zinc-800 transition-all duration-300 ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          } overflow-hidden`}
        >
          <div className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-zinc-400 hover:text-white transition py-3 px-4 hover:bg-zinc-900/50 rounded-lg text-center"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
            
            <div className="flex justify-center gap-6 pt-4 border-t border-zinc-800">
              <a
                href="https://github.com/Josegambin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>

            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-full w-full font-medium"
              onClick={() => handleNavClick("#contact")}
            >
              Contactar
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}