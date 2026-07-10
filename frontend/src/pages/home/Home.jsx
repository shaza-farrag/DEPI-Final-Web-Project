import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import logo from "../../assets/logo.png";

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL HOOK
// ─────────────────────────────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: 1,
    headline: "Classic Cotton Hijab",
    price: "$50.00",
    category: "Hijab",
    tagline: "Premium quality lightweight wrap by Liya Veil",
    shopHref: "/products?category=Hijab",
    img: "https://res.cloudinary.com/e-commerce-data-images/image/upload/v1773504871/SnapInsta.to_475759727_1181081436717255_3644679665418076851_n_q5ripn.jpg",
    imgAlt: "Classic Cotton Hijab",
  },
  {
    id: 2,
    headline: "Hen Mug",
    price: "$117.90",
    category: "Mug",
    tagline: "Artisanal, cozy earthenware by farmhouse pottery",
    shopHref: "/products?category=Mug",
    img: "https://www.farmhousepottery.com/cdn/shop/files/MUG_98_1500x.jpg?v=1772370357",
    imgAlt: "Hen Mug by Farmhouse Pottery",
  },
  {
    id: 3,
    headline: "Hydrating Cleanser",
    price: "$15.99",
    category: "Skin Care",
    tagline: "Gentle, moisture-restoring daily cleanser by CeraVe",
    shopHref: "/products?category=Skin Care",
    img: "https://res.cloudinary.com/e-commerce-data-images/image/upload/v1773064202/Synthetic_Hydrating_Cleanser_Test-01_a3am2s.jpg",
    imgAlt: "Hydrating Cleanser by CeraVe",
  },
  {
    id: 4,
    headline: "Soft Bloom Bag",
    price: "$300.00",
    category: "Handmade bags",
    tagline: "Elegantly hand-woven floral handbag by Lurelle",
    shopHref: "/products?category=Handmade bags",
    img: "https://res.cloudinary.com/e-commerce-data-images/image/upload/v1773460235/cf43210e4f9730e5b01598d09bc7d48f_aoxwjq.webp",
    imgAlt: "Soft Bloom Bag by Lurelle",
  },
  {
    id: 5,
    headline: "Green Shawl",
    price: "$500.00",
    category: "Scarf",
    tagline: "Chic and comfortable wrap scarf by Scarvella",
    shopHref: "/products?category=Scarf",
    img: "https://res.cloudinary.com/e-commerce-data-images/image/upload/v1774389152/Green_Scarf_h6xsi2.jpg",
    imgAlt: "Green Shawl by Scarvella",
  },
  {
    id: 6,
    headline: "Blue Indigo Scrub",
    price: "$170.00",
    category: "Body Care",
    tagline: "Exfoliating and refreshing organic scrub by Hey Sugar",
    shopHref: "/products?category=Body Care",
    img: "https://res.cloudinary.com/e-commerce-data-images/image/upload/v1773442725/1-blue-indiago-scrub_hfvncu.png",
    imgAlt: "Blue Indigo Scrub by Hey Sugar",
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Synthetic Hydrating Cleanser (Test-01)",
    price: 15.99,
    originalPrice: 19.99,
    isSale: true,
    href: "/products/Synthetic_Hydrating_Cleanser_Test-01_a3am2s",
    img: "https://res.cloudinary.com/e-commerce-data-images/image/upload/v1773064202/Synthetic_Hydrating_Cleanser_Test-01_a3am2s.jpg",
    imgAlt: "Synthetic Hydrating Cleanser",
    vendor: "CeraVe",
  },
  {
    id: 2,
    name: "Classic Cotton Hijab",
    price: 50.0,
    originalPrice: null,
    isSale: false,
    href: "/products/SnapInsta.to_475759727_1181081436717255_3644679665418076851_n_q5ripn",
    img: "https://res.cloudinary.com/e-commerce-data-images/image/upload/v1773504871/SnapInsta.to_475759727_1181081436717255_3644679665418076851_n_q5ripn.jpg",
    imgAlt: "Classic Cotton Hijab",
    vendor: "Liya Veil",
  },
  {
    id: 3,
    name: "Hen Mug",
    price: 117.9,
    originalPrice: 130.0,
    isSale: true,
    href: "/products/Hen-Mug_vlgbbr",
    img: "https://www.farmhousepottery.com/cdn/shop/files/MUG_98_1500x.jpg?v=1772370357",
    imgAlt: "Hen Mug by Farmhouse Pottery",
    vendor: "Farmhouse Pottery",
  },
];

const REVIEWS = [
  {
    id: 1,
    title: "AWESOME CLOTHING",
    body: "These clothes are so amazing! So cute and the quality really cannot be beat. I love that the designs are all handmade too, and I feel good about supporting them!",
    author: "MEG",
    stars: 5,
  },
  {
    id: 2,
    title: "VERY BEAUTIFUL! <3",
    body: "I really love the colors. The bright rainbow theme is so much fun, and I can express my fashion style with these unique designs! I need all of them!",
    author: "MALLORY",
    stars: 5,
  },
  {
    id: 3,
    title: "I LOVE IT SO MUCH!",
    body: "I am so hype for this brand! These pieces are so high quality and unique. Mary is so so talented! I want to get the Lainey tank in every single color!",
    author: "SARAH",
    stars: 5,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const Stars = ({ count = 5 }) => (
  <div className="flex justify-center gap-0.5 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < count ? "text-black text-lg" : "text-gray-300 text-lg"}>
        ★
      </span>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 – HERO SLIDER
// ─────────────────────────────────────────────────────────────────────────────

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef(null);
  const [ref, visible] = useScrollReveal();

  const go = (idx) => setCurrent((idx + SLIDES.length) % SLIDES.length);
  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => go(current + 1), 4500);
    return () => clearInterval(timerRef.current);
  }, [current, playing]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{
        background: "#fce8e8",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Sliding track — flex-1 fills remaining height */}
      <div className="flex-1 overflow-hidden">
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform",
          }}
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="relative z-10 shrink-0 px-6 py-12 flex items-center"
              style={{ minWidth: "100%", width: "100%" }}
            >
            <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
              {/* ── LEFT: text ── */}
              <div className="flex-1 flex flex-col items-start">
                <div className="flex items-start gap-4 mb-2">
                  <span className="text-2xl leading-none select-none">✦</span>
                </div>
                <h1
                  className="text-6xl md:text-7xl leading-none text-black mb-2"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 900 }}
                >
                  {slide.headline}
                </h1>
                <div className="flex items-center gap-3 mt-2 mb-4">
                  <span className="text-4xl md:text-5xl font-black leading-none" style={{ color: "#c9a0a0", fontFamily: "'Arial Black', sans-serif" }}>
                    {slide.price}
                  </span>
                  <span className="text-xs font-bold tracking-widest text-[#d4a0a0] uppercase border border-[#d4a0a0] px-2 py-0.5 rounded">
                    {slide.category}
                  </span>
                  <span className="text-xl leading-none select-none">✦</span>
                </div>
                <p className="text-base md:text-lg font-medium text-gray-700 mb-4 max-w-md italic">
                  {slide.tagline}
                </p>
              </div>

              {/* ── RIGHT: image frame ── */}
              <div className="relative flex-1 flex justify-center items-end">
                <span className="absolute -top-2 -right-2 text-2xl select-none z-10">✦</span>
                <span className="absolute top-4 right-8 text-sm select-none z-10">✦</span>
                <div className="relative bg-white p-2 shadow-lg" style={{ maxWidth: "420px", width: "100%" }}>
                  <img src={slide.img} alt={slide.imgAlt} className="w-full object-cover" style={{ aspectRatio: "4/3" }} />
                  <a
                    href={slide.shopHref}
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black text-white text-sm font-black tracking-[0.2em] px-12 py-3 hover:bg-gray-800 transition-colors whitespace-nowrap"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* ── CONTROLS ── */}
      <div className="relative z-10 flex items-center justify-center gap-4 pb-8 mt-8">
        <button onClick={prev} aria-label="Previous slide" className="text-gray-500 hover:text-black transition-colors p-1">
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>

        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all"
            style={{ width: "10px", height: "10px", background: i === current ? "#111" : "transparent", border: "1.5px solid #888" }}
          />
        ))}

        <button onClick={next} aria-label="Next slide" className="text-gray-500 hover:text-black transition-colors p-1">
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>

        <button
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          className="text-gray-500 hover:text-black transition-colors p-1 ml-1"
        >
          {playing ? <Pause size={14} strokeWidth={1.5} /> : <Play size={14} strokeWidth={1.5} />}
        </button>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 – SHOP OUR PICKS
// ─────────────────────────────────────────────────────────────────────────────

function ShopPicks() {
  const [ref, visible] = useScrollReveal();
  return (
    <section className="w-full min-h-screen py-14 px-6 flex flex-col justify-center" style={{ background: "#fce8e8" }}>
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
      {/* Header */}
      <div className="text-center mb-10">
        <h2
          className="text-2xl font-black tracking-[0.18em] text-gray-900 mb-3"
          style={{ letterSpacing: "0.18em" }}
        >
          SHOP OUR PICKS!
        </h2>
        <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
          Explore our handpicked curation of bestsellers, crafted with premium fabrics and natural ingredients to elevate your daily aesthetic.
        </p>
      </div>

      {/* Product grid */}
      <div className="max-w-5xl mx-auto bg-white p-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PRODUCTS.map((p) => (
          <ProductCard
            key={p.id}
            image={p.img}
            imageAlt={p.imgAlt}
            name={p.name}
            price={p.price}
            originalPrice={p.originalPrice}
            href={p.href}
            vendor={p.vendor}
          />
        ))}
      </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 – ABOUT  sherwit
// ─────────────────────────────────────────────────────────────────────────────

function AboutSherwit() {
  const [ref, visible] = useScrollReveal();
  return (
    <section className="w-full min-h-screen bg-white py-16 px-6 overflow-hidden flex items-center justify-center">
      <div
        ref={ref}
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* ── LEFT: image collage ── */}
        <div className="relative shrink-0 w-72 h-80">
          {/* Pink brush-stroke background */}
          <div
            className="absolute"
            style={{
              top: "10px", left: "30px",
              width: "220px", height: "180px",
              background: "#e8b4b8",
              borderRadius: "4px",
              transform: "rotate(-4deg)",
              opacity: 0.5,
              zIndex: 0,
            }}
          />
          <div
            className="absolute"
            style={{
              top: "60px", left: "60px",
              width: "180px", height: "120px",
              background: "#e8b4b8",
              borderRadius: "4px",
              transform: "rotate(6deg)",
              opacity: 0.35,
              zIndex: 0,
            }}
          />

          {/* Main photo */}
          <div
            className="absolute bg-white p-2 shadow-md"
            style={{ top: "20px", left: "10px", width: "220px", zIndex: 1, transform: "rotate(-2deg)" }}
          >
            <img
              src={logo}
              alt="About Sweet Sherwit"
              className="w-full object-contain"
              style={{ aspectRatio: "3/4" }}
            />
          </div>

          {/* HELLO badge */}
          <div
            className="absolute z-10 flex items-center justify-center"
            style={{ bottom: "10px", right: "10px", width: "90px", height: "90px" }}
          >
            {/* Circular text ring */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <circle cx="50" cy="50" r="46" fill="#111" />
              <path id="circlePath" fill="none" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              <text fontSize="11" fontWeight="bold" fill="white" letterSpacing="3">
                <textPath href="#circlePath">HELLO • HELLO • HELLO •</textPath>
              </text>
            </svg>
            {/* Heart center */}
            <span className="relative z-10 text-2xl" style={{ color: "#e8b4b8" }}>♥</span>
          </div>
        </div>

        {/* ── RIGHT: text ── */}
        <div className="flex-1">
          <h2
            className="text-2xl md:text-3xl font-black tracking-[0.15em] mb-6"
            style={{ color: "#d4a0a0", letterSpacing: "0.15em", fontFamily: "'Arial Black', sans-serif" }}
          >
            ABOUT SHERWIT
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            We are six passionate girls who decided to create something meaningful together. Our journey started with a simple idea — supporting women-led startup brands and giving them a space to shine. We wanted to build a platform where every girl can find everything she needs in one place, while also empowering small businesses to grow and reach more people. Today, we’re proud to turn that vision into reality, creating a community built on creativity, ambition, and support.
          </p>
          
          <a
            href="/about"
            className="inline-block px-8 py-3 text-xs font-bold tracking-[0.2em] border border-[#d4a0a0] text-[#d4a0a0] hover:bg-[#d4a0a0] hover:text-white transition-colors"
            style={{ letterSpacing: "0.2em" }}
          >
            READ MORE
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 – NEWSLETTER SUBSCRIBE
// ─────────────────────────────────────────────────────────────────────────────

function Subscribe() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ref, visible] = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Top half – white with watermark */}
      <div className="relative flex-1 bg-white flex flex-col items-center justify-center py-16">
        <span className="absolute inset-0 flex items-center justify-center text-[10vw] font-black select-none pointer-events-none" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", color: "#f0d0d0", opacity: 0.6, whiteSpace: "nowrap", lineHeight: 1 }}>
          subscribe
        </span>
        {/* Envelope — animated */}
        <div ref={ref} className="relative z-10" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl select-none" style={{ color: "#e8b4b8" }}>♥</span>
          <svg viewBox="0 0 80 60" className="w-20 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="78" height="58" rx="2" fill="#111" />
            <polyline points="1,1 40,35 79,1" fill="none" stroke="white" strokeWidth="3" />
            <line x1="1" y1="59" x2="30" y2="32" stroke="white" strokeWidth="2.5" />
            <line x1="79" y1="59" x2="50" y2="32" stroke="white" strokeWidth="2.5" />
          </svg>
        </div>
      </div>

      {/* Bottom half – blush pink, animated */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-14" style={{ background: "#e8c4c4" }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s" }} className="w-full flex flex-col items-center">
          <h2 className="text-lg md:text-xl font-black tracking-[0.18em] text-gray-900 text-center mb-4" style={{ letterSpacing: "0.18em" }}>
            JOIN THE LIST FOR 10% OFF YOUR FIRST PURCHASE!
          </h2>
          <p className="text-sm text-gray-600 text-center mb-1">Plus, be the first to know about new collections and exclusive offers.</p>
          <p className="text-sm text-gray-500 italic text-center mb-8">We never spam. Unsubscribe anytime.</p>
          {submitted ? (
            <p className="text-sm font-semibold text-gray-700 tracking-wider text-center">Thanks for subscribing! 🎉</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-md border border-gray-200 bg-white">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent" />
              <button type="submit" className="bg-black text-white px-5 flex items-center justify-center hover:bg-gray-800 transition-colors" aria-label="Subscribe">
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 – KIND WORDS (Testimonials)
// ─────────────────────────────────────────────────────────────────────────────

function KindWords() {
  const [ref, visible] = useScrollReveal();
  return (
    <section className="relative w-full min-h-screen py-16 px-6 overflow-hidden flex flex-col justify-center" style={{ background: "#e8c4c4" }}>
      {/* Background SVG — always visible */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full" style={{ height: "160px", opacity: 0.35 }}>
          <path d="M0,160 C120,80 250,180 400,120 C550,60 650,160 800,100 C950,40 1100,140 1280,80 L1440,60 L1440,200 L0,200 Z" fill="#c09090" />
          <path d="M0,180 C100,120 300,200 500,150 C700,100 900,180 1100,130 C1200,105 1350,155 1440,120 L1440,200 L0,200 Z" fill="#b88080" />
        </svg>
      </div>

      {/* Inner content — animated */}
      <div ref={ref} className="relative z-10" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        {/* Section heading */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-4">
            <div className="w-16 h-14 rounded-full flex items-center justify-center" style={{ background: "#111" }}>
              <span className="text-2xl leading-none">
                <span style={{ color: "#e8b4b8" }}>♥</span>
                <span className="text-white text-sm ml-0.5">♥</span>
              </span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "10px solid #111" }} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl text-gray-700 select-none">✦</span>
            <div className="bg-white px-8 py-4 shadow" style={{ lineHeight: 1 }}>
              <h2 className="text-4xl font-black tracking-wide text-gray-900" style={{ fontFamily: "'Arial Black', sans-serif", letterSpacing: "0.06em" }}>KIND WORDS</h2>
            </div>
          </div>
          <p className="mt-4 text-xs font-bold tracking-[0.3em] text-gray-700" style={{ letterSpacing: "0.32em" }}>FROM OUR CUSTOMERS</p>
        </div>

        {/* Review cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.id} className="flex flex-col items-center">
              <Stars count={r.stars} />
              <div className="bg-white p-6 w-full text-center shadow-sm">
                <h3 className="text-xs font-bold tracking-[0.16em] mb-4" style={{ color: "#d4a0a0", letterSpacing: "0.16em" }}>{r.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">{r.body}</p>
                <p className="text-xs font-bold tracking-[0.18em] text-gray-500" style={{ letterSpacing: "0.18em" }}>{r.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="w-full">
      <HeroSlider />
      <ShopPicks />
      <AboutSherwit />
      <Subscribe />
      <KindWords />
    </div>
  );
}
