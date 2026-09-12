import React, { useState, useEffect } from "react";
import { Menu, X, ShieldCheck, ChevronRight } from "lucide-react";
import { schoolConfig } from "../config/schoolConfig";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F172A]/80 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Identitas */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-bold text-lg">
            14
          </div>
          <div>
            <span className="text-white font-semibold tracking-wide block text-sm sm:text-base">
              {schoolConfig.shortName}
            </span>
            <span className="text-xs text-amber-400 font-medium tracking-widest uppercase">
              Official Platform
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-amber-400 transition-colors">
            Beranda
          </a>
          <a href="#profile" className="hover:text-amber-400 transition-colors">
            Profil
          </a>
          <a href="#jurusan" className="hover:text-amber-400 transition-colors">
            Jurusan
          </a>
          <a
            href="#akademik"
            className="hover:text-amber-400 transition-colors"
          >
            Akademik
          </a>
          <a href="#kontak" className="hover:text-amber-400 transition-colors">
            Kontak
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#ppdb"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium shadow-lg shadow-amber-500/20 hover:from-amber-600 hover:to-amber-700 transition-all flex items-center space-x-2"
          >
            <span>PPDB 2026</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2 focus:outline-none"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-amber-400 font-medium"
          >
            Beranda
          </a>
          <a
            href="#profile"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-amber-400 font-medium"
          >
            Profil
          </a>
          <a
            href="#jurusan"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-amber-400 font-medium"
          >
            Jurusan
          </a>
          <a
            href="#akademik"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-amber-400 font-medium"
          >
            Akademik
          </a>
          <a
            href="#kontak"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-amber-400 font-medium"
          >
            Kontak
          </a>
          <div className="pt-2">
            <a
              href="#ppdb"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium text-center shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
            >
              <span>PPDB 2026</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
