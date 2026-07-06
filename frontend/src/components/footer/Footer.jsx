
import { useState } from "react";
import { ArrowRight, ArrowUp} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaPinterest, FaTiktok } from "react-icons/fa";


const QUICK_LINKS = [
  { label: "SEARCH", href: "/search" },
  { label: "ABOUT", href: "/about" },
  { label: "REFUND POLICY", href: "/refund-policy" },
  { label: "PRIVACY POLICY", href: "/privacy-policy" },
  { label: "TERMS OF SERVICE", href: "/terms-of-service" },
  { label: "CONTACT", href: "/contact" },
];


export default function Footer() {
  const [email, setEmail] = useState("");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (

    <footer className="bg-white pt-16 pb-0 relative">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="relative w-40 h-36 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background: "radial-gradient(ellipse at 55% 50%, #f0b8b8 0%, transparent 70%)",
                  transform: "scale(1.4,1)",
                }}
              />
              <span
                className="relative z-10 text-7xl leading-none select-none"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontStyle: "italic",
                  fontWeight: 900,
                  color: "#111",
                  letterSpacing: "-0.06em",
                }}
              >
                <span style={{ color: "#d4a0a0" }}>sherwit</span>
              </span>
              <span className="absolute top-3 right-5 text-black text-lg select-none">✦</span>
              <span className="absolute top-1 right-8 text-black text-xs select-none">+</span>
              <span className="absolute top-0 right-6 text-black text-[8px] select-none">+</span>
            </div>
            <p
              className="text-xs tracking-[0.25em] font-semibold text-gray-700 mt-1"
              style={{ letterSpacing: "0.28em" }}
            >
              SHERWIT
            </p>
          </div>

          <hr className="border-gray-200 mb-6 w-full" />

          <div className="flex items-center gap-5 text-black">
            <a href="#" aria-label="Facebook" className="hover:text-[#d4a0a0] transition-colors">
            <FaFacebook />
            </a>
            <a href="#" aria-label="Pinterest" className="hover:text-[#d4a0a0] transition-colors">
            <FaPinterest />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#d4a0a0] transition-colors">
            <FaInstagram />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-[#d4a0a0] transition-colors">
            <FaTiktok />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-[#d4a0a0] transition-colors">
            <FaYoutube />
            </a>
          </div>
        </div>

        <div>
          <h3
            className="text-xs tracking-[0.22em] font-bold mb-6"
            style={{ color: "#d4a0a0", letterSpacing: "0.22em" }}
          >
            QUICK LINKS
          </h3>
          <ul className="space-y-3">
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm font-bold tracking-widest text-gray-800 hover:underline hover:text-[#d4a0a0] transition-colors"
                  style={{ letterSpacing: "0.12em" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3
            className="text-xs tracking-[0.22em] font-bold mb-6"
            style={{ color: "#d4a0a0", letterSpacing: "0.22em" }}
          >
            STAY IN TOUCH WITH US!
          </h3>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-200 px-4 py-3 text-sm text-gray-600 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
            />
            <button
              type="submit"
              className="bg-black text-white py-3 flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col items-center -mb-px">
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex flex-col items-center gap-1 mb-2 group"
        >
          <ArrowUp size={16} strokeWidth={2} className="text-gray-600 group-hover:text-black transition-colors" />
          <span
            className="w-14 h-14 rounded-full flex items-center justify-center text-xs font-bold tracking-widest text-gray-700 group-hover:bg-pink-200 transition-colors"
            style={{ background: "#e8b4b8", letterSpacing: "0.12em" }}
          >
            TOP
          </span>
        </button>
      </div>

      <div className="bg-black text-white text-xs text-center py-4 tracking-wide mt-0">
        © 2026, SHERWIT
      </div>
    </footer>
  );

}
