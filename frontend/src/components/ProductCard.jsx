
export default function ProductCard({
  image,
  imageAlt = "Product image",
  name,
  vendor = "",
  price,
  originalPrice = null,
  href = "#",
  onAddToCart = null,
}) {
  return (
    <div className="group flex flex-col bg-white w-full max-w-xs">
      {/* ── IMAGE AREA ─────────────────────────────────────────────────────── */}
      <a href={href} className="relative block overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

      </a>

      {/* ── INFO AREA ──────────────────────────────────────────────────────── */}
      <div
        className="flex flex-col items-center text-center px-4 pt-5 pb-6 gap-1"
        style={{ background: "#fef5f5" }}
      >
        {/* Product name */}
        <a href={href}>
          <h3
            className="text-xs font-bold tracking-[0.16em] leading-snug hover:underline"
            style={{ color: "#d4a0a0", letterSpacing: "0.16em" }}
          >
            {name}
          </h3>
        </a>

        {/* Vendor / subtitle */}
        {vendor && (
          <p className="text-xs text-gray-500 tracking-widest uppercase mt-0.5">
            {vendor}
          </p>
        )}

        {/* Pricing */}
        <div className="flex items-center justify-center gap-3 mt-2 flex-wrap">
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice.toFixed(2)} USD
            </span>
          )}
          <span className="text-sm font-semibold text-gray-800">
            ${price.toFixed(2)} USD
          </span>
        </div>

        {/* Optional add-to-cart button */}
        {onAddToCart && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart({ name, price, image });
            }}
            className="mt-4 w-full bg-black text-white text-xs font-bold tracking-[0.16em] py-2.5 hover:bg-gray-800 transition-colors"
            style={{ letterSpacing: "0.16em" }}
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
}
