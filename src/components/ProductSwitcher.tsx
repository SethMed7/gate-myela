"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Zap, ExternalLink, Check } from "lucide-react";

const products = [
  {
    id: "gateway",
    name: "Gateway",
    description: "Payment Processing",
    icon: Zap,
    href: "/",
    external: false,
    active: true,
  },
  {
    id: "msd-edge",
    name: "MSD Edge",
    description: "Partner Portal",
    icon: Zap,
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
        className="w-full flex items-center gap-3 p-1 pr-2 rounded-xl hover:bg-white/5 transition-all group"
      >
        <div className="w-10 h-10 rounded-xl bg-[#3B82F6] flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1 text-left">
          <span className="font-bold text-base tracking-tight block">{activeProduct.name}</span>
          <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase">
            {activeProduct.description}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/40 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-3 py-2">
              Switch Product
            </div>
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <a
                  key={product.id}
                  href={product.href}
                  target={product.external ? "_blank" : undefined}
                  rel={product.external ? "noopener noreferrer" : undefined}
                  onClick={() => !product.external && setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    product.active
                      ? "bg-[#3B82F6]/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      product.active ? "bg-[#3B82F6]" : "bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-[11px] text-white/40">{product.description}</div>
                  </div>
                  {product.active ? (
                    <Check className="w-4 h-4 text-[#3B82F6]" />
                  ) : product.external ? (
                    <ExternalLink className="w-4 h-4 text-white/30" />
                  ) : null}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
