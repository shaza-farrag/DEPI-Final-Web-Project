import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { FaFacebook, FaInstagram, FaPinterest, FaTiktok, FaShoppingCart, FaUser, FaChevronCircleDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const SHOP_ITEMS = ["Hijabs", "Mugs", "Skincare", "Makeup"];

const NAV_LINKS = [
  { label: "HOME", to: "/" },
  { label: "ABOUT US", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "BLOG", to: "/blog" },
  { label: "CONTACT", to: "/contact" },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [shopOpen, setShopOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY.current && current > 80) {
        setVisible(false);
        setShopOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest("[data-shop-dropdown]")) setShopOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative flex items-center justify-between px-6 py-3 border-b border-gray-100">
          <button
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
            className="p-1 text-gray-700 hover:text-black transition-colors"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          {/* Absolutely centered logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 select-none">
            <span
              className="text-3xl font-black tracking-widest uppercase"
              style={{ color: "#d4a0a0", fontFamily: "'Arial Black', sans-serif" }}
            >
              OUR BRAND
            </span>
          </Link>

          <div className="flex items-center gap-3 text-black ml-auto">
            <a href="#" aria-label="Facebook" className="hover:text-[#d4a0a0] transition-colors hidden sm:inline-flex">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Pinterest" className="hover:text-[#d4a0a0] transition-colors hidden sm:inline-flex">
              <FaPinterest />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#d4a0a0] transition-colors hidden sm:inline-flex">
              <FaInstagram />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-[#d4a0a0] transition-colors hidden sm:inline-flex">
              <FaTiktok />
            </a>

            <Link to="/cart" aria-label="Cart" className="relative hover:text-[#d4a0a0] transition-colors ml-1">
              <FaShoppingCart size={20} />
              <span
                className="absolute -top-1.5 -right-1.5 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "#111" }}
              >
                0
              </span>
            </Link>

            <Link to="/login" aria-label="Account" className="hover:text-[#d4a0a0] transition-colors">
              <FaUser size={20} />
            </Link>
          </div>
        </div>

        <nav
          className="flex items-center justify-center gap-8 px-6 py-2.5 text-xs font-bold tracking-widest"
          style={{ background: "#fce8e8" }}
        >
          {["HOME", "ABOUT US", "FAQ", "BLOG", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className=" text-black hover:text-[#d4a0a0] transition-colors"
              style={{ letterSpacing: "0.12em" }}
            >
              {item}
            </a>
          ))}

          <div className="relative" data-shop-dropdown>
            <button
              onClick={() => setShopOpen((v) => !v)}
              className="flex items-center gap-0.5 text-black hover:text-[#d4a0a0] transition-colors font-bold tracking-widest text-xs"
              style={{ letterSpacing: "0.12em" }}
            >
              SHOP
              <FaChevronCircleDown
                size={12}
                style={{
                  transform: shopOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                }}
              />
            </button>

            {shopOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-white shadow-lg border border-gray-100 rounded z-50">
                {SHOP_ITEMS.map((s) => (
                  <Link
                    key={s}
                    to={`/shop/${s.toLowerCase()}`}
                    className="block px-4 py-2.5 text-xs tracking-widest text-gray-600 hover:underline hover:text-black transition-colors font-semibold"
                    onClick={() => setShopOpen(false)}
                  >
                    {s.toUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="fixed inset-0 z-100 flex items-start justify-center"
        style={{
          background: "rgba(255,255,255,0.96)",
          opacity: searchOpen ? 1 : 0,
          pointerEvents: searchOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        <div className="w-full max-w-2xl mt-24 px-6 flex items-center gap-3">
          <div className="flex-1 relative border border-gray-300">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
              className="w-full py-3 pl-4 pr-10 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              aria-label="Submit search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#d4a0a0]"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
          </div>

          <button
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
            className="text-gray-500 hover:text-[#d4a0a0] transition-colors p-1"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </>
  );
}
