"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

const products = [
  {
    id: "gateway",
    name: "Gateway",
    href: "/",
    external: false,
    active: true,
  },
  {
    id: "msd-edge",
    name: "MSD Edge",
    href: "https://partners-poc.merchantservicedepot.com/auth?redirect=%2F",
    external: true,
    active: false,
  },
];

export default function ProductSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeProduct = products.find((p) => p.active) || products[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 py-1 text-white/90 hover:text-white transition-colors"
      >
        <span className="font-semibold text-sm">{activeProduct.name}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/40 transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-[140px] bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="py-1">
            {products.map((product) => (
              <a
                key={product.id}
                href={product.href}
                target={product.external ? "_blank" : undefined}
                rel={product.external ? "noopener noreferrer" : undefined}
                onClick={() => !product.external && setIsOpen(false)}
                className={`flex items-center justify-between gap-3 px-3 py-2 text-sm transition-colors ${
                  product.active
                    ? "text-white bg-white/5"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{product.name}</span>
                {product.external && (
                  <ExternalLink className="w-3 h-3 text-white/30" />
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
