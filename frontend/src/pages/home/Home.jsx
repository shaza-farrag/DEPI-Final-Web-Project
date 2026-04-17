import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    headline: "Sale",
    percent: "25%",
    sub: "THE ENTIRE SITE",
    shopHref: "/shop",
    // Replace with your real image URLs
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80",
    imgAlt: "Sale items",
  },
  {
    id: 2,
    headline: "New In",
    percent: "Fresh",
    sub: "ARRIVALS THIS WEEK",
    shopHref: "/shop/new",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=700&q=80",
    imgAlt: "New arrivals",
  },
  {
    id: 3,
    headline: "Summer",
    percent: "Vibes",
    sub: "SHOP THE COLLECTION",
    shopHref: "/shop/summer",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80",
    imgAlt: "Summer collection",
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: "FLOWER SCRAPBOOK JOURNAL",
    price: 32.0,
    originalPrice: 39.0,
    isSale: true,
    href: "/products/flower-scrapbook-journal",
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    imgAlt: "Flower Scrapbook Journal",
  },
  {
    id: 2,
    name: "PINK & GOLD JOURNAL",
    price: 24.0,
    originalPrice: null,
    isSale: false,
    href: "/products/pink-gold-journal",
    img: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&q=80",
    imgAlt: "Pink & Gold Journal",
  },
  {
    id: 3,
    name: "HELLO THERE MUG",
    price: 19.0,
    originalPrice: null,
    isSale: false,
    href: "/products/hello-there-mug",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    imgAlt: "Hello There Mug",
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

const Stars = ({ count = 5 }) => (
  <div className="flex justify-center gap-0.5 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < count ? "text-black text-lg" : "text-gray-300 text-lg"}>
        ★
      </span>
    ))}
  </div>
);

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef(null);

  const go = (idx) => setCurrent((idx + SLIDES.length) % SLIDES.length);
  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => go(current + 1), 4500);
    return () => clearInterval(timerRef.current);
  }, [current, playing]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#fce8e8", minHeight: "340px" }}
    >
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-64 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, #c9898f 0%, transparent 70%)",
          filter: "blur(18px)",
          transform: "translateY(-50%) scaleX(0.6) rotate(-8deg)",
        }}
      />
      <div
        className="absolute right-0 top-1/4 w-40 h-48 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, #c9898f 0%, transparent 70%)",
          filter: "blur(22px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1 flex flex-col items-start">
          <div className="flex items-start gap-4 mb-2">
            <span className="text-2xl leading-none select-none">✦</span>
          </div>

          <h1
            className="text-7xl md:text-8xl leading-none text-black mb-1"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontWeight: 900,
            }}
          >
            {slide.headline}
          </h1>

          <div className="flex items-end gap-3 mt-1 mb-4">
            <span
              className="text-5xl md:text-6xl font-black leading-none"
              style={{ color: "#c9a0a0", fontFamily: "'Arial Black', sans-serif" }}
            >
              {slide.percent}
            </span>
            <span
              className="text-3xl md:text-4xl font-black leading-none"
              style={{ color: "#d4b0b0", fontFamily: "'Arial Black', sans-serif" }}
            >
              OFF
            </span>
            <span className="text-xl leading-none select-none mb-1">✦</span>
          </div>

          <p
            className="text-lg md:text-xl font-black tracking-[0.2em] text-gray-800 mb-2"
            style={{ letterSpacing: "0.22em" }}
          >
            {slide.sub}
          </p>
        </div>

        <div className="relative flex-1 flex justify-center items-end">
          {/* Corner sparkles */}
          <span className="absolute -top-2 -right-2 text-2xl select-none z-10">✦</span>
          <span className="absolute top-4 right-8 text-sm select-none z-10">✦</span>

          <div
            className="relative bg-white p-2 shadow-lg"
            style={{ maxWidth: "420px", width: "100%" }}
          >
            <img
              src={slide.img}
              alt={slide.imgAlt}
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
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

      <div className="relative z-10 flex items-center justify-center gap-4 pb-8 mt-8">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="text-gray-500 hover:text-black transition-colors p-1"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>

        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all"
            style={{
              width: i === current ? "10px" : "10px",
              height: "10px",
              background: i === current ? "#111" : "transparent",
              border: "1.5px solid #888",
            }}
          />
        ))}

        <button
          onClick={next}
          aria-label="Next slide"
          className="text-gray-500 hover:text-black transition-colors p-1"
        >
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

function ShopPicks() {
  return (
    <section className="py-14 px-6" style={{ background: "#fce8e8" }}>
      <div className="text-center mb-10">
        <h2
          className="text-2xl font-black tracking-[0.18em] text-gray-900 mb-3"
          style={{ letterSpacing: "0.18em" }}
        >
          SHOP OUR PICKS!
        </h2>
        <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
          Share information about your brand with your customers. Describe a
          product, make announcements, or welcome customers to your store
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white p-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {PRODUCTS.map((p, i) => (
          <a
            key={p.id}
            href={p.href}
            className={`group block relative ${
              i < PRODUCTS.length - 1 ? "sm:border-r border-gray-100" : ""
            }`}
          >
            {p.isSale && (
              <span
                className="absolute top-3 left-3 z-10 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: "#d4a0a0" }}
              >
                Sale
              </span>
            )}

            <div className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img
                src={p.img}
                alt={p.imgAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="pt-4 pb-6 px-2 text-center">
              <h3
                className="text-xs font-bold tracking-[0.14em] mb-2"
                style={{ color: "#d4a0a0", letterSpacing: "0.14em" }}
              >
                {p.name}
              </h3>
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-800">
                {p.originalPrice && (
                  <span className="line-through text-gray-400 text-xs">
                    ${p.originalPrice.toFixed(2)} USD
                  </span>
                )}
                <span>${p.price.toFixed(2)} USD</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 – NEWSLETTER SUBSCRIBE
// ─────────────────────────────────────────────────────────────────────────────

function Subscribe() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // wire to your email provider here
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden">
      <div className="relative bg-white pt-16 pb-24 flex flex-col items-center">
        <span
          className="absolute inset-0 flex items-center justify-center text-[10vw] font-black select-none pointer-events-none"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            color: "#f0d0d0",
            opacity: 0.6,
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          subscribe
        </span>

        <div className="relative z-10 mt-auto">
          <div className="relative">
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl select-none"
              style={{ color: "#e8b4b8" }}
            >
              ♥
            </span>
            <svg
              viewBox="0 0 80 60"
              className="w-20 h-16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="1" width="78" height="58" rx="2" fill="#111" />
              <polyline
                points="1,1 40,35 79,1"
                fill="none"
                stroke="white"
                strokeWidth="3"
              />
              <line x1="1" y1="59" x2="30" y2="32" stroke="white" strokeWidth="2.5" />
              <line x1="79" y1="59" x2="50" y2="32" stroke="white" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center px-6 py-14"
        style={{ background: "#fce8e8" }}
      >
        <h2
          className="text-lg md:text-xl font-black tracking-[0.18em] text-gray-900 text-center mb-4"
          style={{ letterSpacing: "0.18em" }}
        >
          JOIN THE LIST FOR 10% OFF YOUR FIRST PURCHASE!
        </h2>
        <p className="text-sm text-gray-600 text-center mb-1">
          Plus, be the first to know about new collections and exclusive offers.
        </p>
        <p className="text-sm text-gray-500 italic text-center mb-8">
          We never spam. Unsubscribe anytime.
        </p>

        {submitted ? (
          <p className="text-sm font-semibold text-gray-700 tracking-wider">
            Thanks for subscribing! 🎉
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md border border-gray-200 bg-white"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              type="submit"
              className="bg-black text-white px-5 flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}


function KindWords() {
  return (
    <section
      className="relative py-16 px-6 overflow-hidden"
      style={{ background: "#e8c4c4" }}
    >
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "160px", opacity: 0.35 }}
        >
          <path
            d="M0,160 C120,80 250,180 400,120 C550,60 650,160 800,100 C950,40 1100,140 1280,80 L1440,60 L1440,200 L0,200 Z"
            fill="#c09090"
          />
          <path
            d="M0,180 C100,120 300,200 500,150 C700,100 900,180 1100,130 C1200,105 1350,155 1440,120 L1440,200 L0,200 Z"
            fill="#b88080"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center mb-12">
        <div className="relative mb-4">
          <div
            className="w-16 h-14 rounded-full flex items-center justify-center"
            style={{ background: "#111" }}
          >
            <span className="text-2xl leading-none">
              <span style={{ color: "#e8b4b8" }}>♥</span>
              <span className="text-white text-sm ml-0.5">♥</span>
            </span>
          </div>
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "10px solid #111",
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl text-gray-700 select-none">✦</span>
          <div
            className="bg-white px-8 py-4 shadow"
            style={{ lineHeight: 1 }}
          >
            <h2
              className="text-4xl font-black tracking-wide text-gray-900"
              style={{ fontFamily: "'Arial Black', sans-serif", letterSpacing: "0.06em" }}
            >
              KIND WORDS
            </h2>
          </div>
        </div>

        <p
          className="mt-4 text-xs font-bold tracking-[0.3em] text-gray-700"
          style={{ letterSpacing: "0.32em" }}
        >
          FROM OUR CUSTOMERS
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((r) => (
          <div key={r.id} className="flex flex-col items-center">
            <Stars count={r.stars} />
            <div className="bg-white p-6 w-full text-center shadow-sm">
              <h3
                className="text-xs font-bold tracking-[0.16em] mb-4"
                style={{ color: "#d4a0a0", letterSpacing: "0.16em" }}
              >
                {r.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">{r.body}</p>
              <p
                className="text-xs font-bold tracking-[0.18em] text-gray-500"
                style={{ letterSpacing: "0.18em" }}
              >
                {r.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <div className="w-full">
      <HeroSlider />
      <ShopPicks />
      <Subscribe />
      <KindWords />
    </div>
  );
}
