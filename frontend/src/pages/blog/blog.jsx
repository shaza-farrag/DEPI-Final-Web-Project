import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

// Scroll Reveal Hook
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

const BLOG_POSTS = [
  {
    id: 1,
    title: "CHIC & MODEST: HOW TO STYLE YOUR HIJAB",
    category: "HIJABS",
    date: "OCTOBER 12, 2026",
    img: "/hijab-slider.png",
    imgAlt: "Aesthetic green crinkle hijabs worn by models",
    excerpt: "Discover our top tips for styling hijabs effortlessly. From choosing the right drape to matching pastel colors with your daily wardrobe, we share simple hacks to elevate your everyday look."
  },
  {
    id: 2,
    title: "THE ULTIMATE GUIDE TO GLOWING SKIN",
    category: "SKINCARE",
    date: "NOVEMBER 5, 2026",
    img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80",
    imgAlt: "Clean skincare bottles, pink rose tones, serum droppers",
    excerpt: "Ready to achieve that natural, dewy glow? Our experts break down the essential skincare steps, detailing the best ingredients for deep hydration, restoration, and a smooth daily complexion."
  },
  {
    id: 3,
    title: "COZY CORNERS: AESTHETIC MUG COLLECTING",
    category: "MUGS",
    date: "DECEMBER 1, 2026",
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    imgAlt: "Minimalist ceramic mug on a modern workspace desk with flowers",
    excerpt: "There's nothing quite like holding a warm, beautifully crafted ceramic mug. Explore our favorite workspace setups and cozy coffee moments designed to boost your daily inspiration and productivity."
  },
  {
    id: 4,
    title: "FLAWLESS MINIMALIST MAKEUP TUTORIAL",
    category: "MAKEUP",
    date: "JANUARY 15, 2027",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    imgAlt: "Soft makeup brushes and pastel cosmetic palettes",
    excerpt: "Master the subtle art of the 'no-makeup' makeup look. We show you how to choose the right neutral tones, apply a seamless base, and add a pop of blush for a clean, effortless beauty routine."
  }
];

export default function Blog() {
  const [bannerRef, bannerVisible] = useScrollReveal();
  const [subRef, subVisible] = useScrollReveal();
  const [gridRef, gridVisible] = useScrollReveal();

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="w-full bg-white font-sans">
      {/* WELCOME BANNER SECTION */}
      <section 
        ref={bannerRef}
        className="relative w-full bg-[#fdf5f5] overflow-hidden py-16 md:py-24 border-b border-gray-100 flex justify-center"
        style={{
          opacity: bannerVisible ? 1 : 0,
          transform: bannerVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Soft Watercolor Blobs for Artistic Pink Aesthetic */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] rounded-[50%] bg-[#fce8e8] blur-[80px] opacity-70 pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[80%] rounded-[50%] bg-[#fce8e8] blur-[80px] opacity-70 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-[50%] bg-white blur-[60px] opacity-90 pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Stacked Aesthetic Images */}
          <div className="lg:col-span-7 flex justify-center items-center relative">
            
            {/* Top-Left Sparkles */}
            <div className="absolute -left-5 -top-7.5 md:left-5 md:-top-10 text-black z-20 flex items-start gap-1">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c.2 4.4 3.6 7.8 8 8-4.4.2-7.8 3.6-8 8-.2-4.4-3.6-7.8-8-8 4.4-.2 7.8-3.6 8-8z" />
              </svg>
              <div className="flex flex-col gap-2 mt-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c.2 4.4 3.6 7.8 8 8-4.4.2-7.8 3.6-8 8-.2-4.4-3.6-7.8-8-8 4.4-.2 7.8-3.6 8-8z" />
                </svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c.2 4.4 3.6 7.8 8 8-4.4.2-7.8 3.6-8 8-.2-4.4-3.6-7.8-8-8 4.4-.2 7.8-3.6 8-8z" />
                </svg>
              </div>
            </div>

            {/* Image Cluster Container */}
            <div className="relative w-full max-w-105 aspect-4/3 mr-4 md:mr-12">
              {/* Main iMac Desk Setup Image */}
              <div className="w-[85%] h-full ml-auto border-8 border-[#d4a0a0] bg-white shadow-[12px_12px_0px_0px_rgba(17,17,17,1)] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80" 
                  alt="Rose computer setup" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Inset Flatlay Image */}
              <div className="absolute -left-2.5 -bottom-5 md:-left-7.5 w-[50%] aspect-square border-8 border-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] overflow-hidden z-10">
                <img 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80" 
                  alt="Flatlay accessories" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Modern Typography Block */}
          <div className="lg:col-span-5 flex items-center justify-between w-full relative">
            <div className="flex flex-col items-start">
              <span className="text-sm md:text-base tracking-[0.25em] text-[#d4a0a0] font-black uppercase leading-tight">
                WELCOME
              </span>
              <span className="text-sm md:text-base tracking-[0.25em] text-[#d4a0a0] font-black uppercase leading-tight">
                TO THE
              </span>
              
              <div className="relative flex items-center mt-1">
                <h1 className="text-6xl md:text-8xl tracking-wider text-black font-black uppercase leading-none select-none">
                  BLOG
                </h1>
                
                {/* Bottom-Right Sparkles */}
                <div className="absolute right-11.25 bottom-0 text-black flex items-start gap-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c.2 4.4 3.6 7.8 8 8-4.4.2-7.8 3.6-8 8-.2-4.4-3.6-7.8-8-8 4.4-.2 7.8-3.6 8-8z" />
                  </svg>
                  <div className="flex flex-col gap-1 mt-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c.2 4.4 3.6 7.8 8 8-4.4.2-7.8 3.6-8 8-.2-4.4-3.6-7.8-8-8 4.4-.2 7.8-3.6 8-8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Elegant Cursive Text on the Far Right */}
            <div className="hidden sm:block absolute -right-10 md:-right-15 top-1/2 -translate-y-1/2 rotate-90 origin-center translate-x-12">
              <span 
                className="text-[#d4a0a0]/60 text-4xl md:text-5xl tracking-wide whitespace-nowrap select-none"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                read about it
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE SECTION */}
      <section 
        ref={subRef}
        className="bg-[#fdf5f5] py-12 px-6 flex flex-col items-center justify-center border-b border-gray-100"
        style={{
          opacity: subVisible ? 1 : 0,
          transform: subVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
        }}
      >
        <h2 className="text-[#d4a0a0] font-black tracking-[0.25em] text-center text-sm md:text-base uppercase mb-2">
          SUBSCRIBE TO KNOW WHEN A NEW POST LAUNCHES!
        </h2>
        <p className="text-xs text-gray-500 tracking-wide text-center mb-6">
          Be the first to know about new collections, sales, and exclusive offers.
        </p>

        {subscribed ? (
          <p className="text-xs font-bold text-gray-700 tracking-widest uppercase py-3">
            Thanks for subscribing! 🎉
          </p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md border border-gray-300 bg-white shadow-sm">
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 text-xs tracking-wider text-gray-700 placeholder-gray-400 outline-none bg-transparent uppercase"
            />
            <button
              type="submit"
              className="bg-black text-white px-5 flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </section>

      {/* BLOG POSTS GRID */}
      <section 
        ref={gridRef}
        className="max-w-6xl mx-auto py-16 px-6"
        style={{
          opacity: gridVisible ? 1 : 0,
          transform: gridVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="flex flex-col items-center bg-white shadow-sm border border-gray-100">
              <div className="w-full overflow-hidden aspect-4/3bg-gray-50 group cursor-pointer">
                <img
                  src={post.img}
                  alt={post.imgAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="w-full bg-[#fce8e8] p-6 md:p-8 flex flex-col items-center grow">
                <h3 className="text-[#d4a0a0] font-black tracking-[0.18em] text-center text-base md:text-lg mb-1 uppercase hover:text-black transition-colors duration-300 cursor-pointer">
                  {post.title}
                </h3>

                <div className="text-[10px] md:text-xs text-gray-500 font-bold tracking-[0.25em] mb-4 text-center uppercase">
                  {post.category} — {post.date}
                </div>

                <p className="text-xs md:text-sm text-gray-700 text-center max-w-md leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
