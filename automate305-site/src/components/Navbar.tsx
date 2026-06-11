"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/industries/home-services", label: "Industries" },
    { href: "/#solutions", label: "Solutions" },
    { href: "/results", label: "Results" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-brand-purple fill-brand-purple" />
            <span className="font-black text-xl tracking-tight">
              AUTOMATE<span className="text-brand-purple">305</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-700 hover:text-brand-purple transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://cal.com/automate305"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-purple text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              Book a Free Audit
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-brand-cream border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-700"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://cal.com/automate305"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-purple text-white text-sm font-semibold px-5 py-2 rounded-full text-center"
          >
            Book a Free Audit
          </a>
        </div>
      )}
    </nav>
  );
}
