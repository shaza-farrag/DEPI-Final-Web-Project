import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useProduct } from "../../hooks/useProduct";
import { useAddToCart } from "../../hooks/useCart";

function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading, isError } = useProduct(id);

  const product = data?.data;

  const { mutate: addToCart, isPending } = useAddToCart();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      quantity,
    });
  };

  return (
    <div className="bg-white min-h-screen p-12">
      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12">

        <img
          src={product.image?.url}
          alt={product.name}
          className="w-full h-137.5 object-cover rounded-lg shadow"
        />

        <div className="flex flex-col gap-4">

          <p className="text-xs uppercase tracking-widest text-gray-400">
            {product.brand?.name}
          </p>

          <h1 className="text-3xl uppercase tracking-widest text-[#dfb6b5] font-semibold">
            {product.name}
          </h1>

          <p className="text-lg font-semibold">
            ${product.price}
          </p>

          <p className="text-gray-500 leading-7">
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Availability:
            </span>

            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-red-500 font-semibold">
                Out of Stock
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500">
  Quantity
</p>

<div className="flex items-center border border-gray-300 w-fit">

  <button
    disabled={quantity === 1}
    onClick={() => setQuantity((q) => q - 1)}
    className={`px-4 py-2 text-lg ${
      quantity === 1
        ? "text-gray-300 cursor-not-allowed"
        : "cursor-pointer"
    }`}
  >
    −
  </button>

  <span className="px-6 py-2 border-x border-gray-300">
    {quantity}
  </span>

  <button
    disabled={product.stock === 0 || quantity >= product.stock}
    onClick={() => setQuantity((q) => q + 1)}
    className={`px-4 py-2 text-lg ${
      product.stock === 0 || quantity >= product.stock
        ? "text-gray-300 cursor-not-allowed"
        : "cursor-pointer"
    }`}
  >
    +
  </button>

</div>

{product.stock > 0 && (
  <p className="text-xs text-gray-500">
    Selected {quantity} of {product.stock} available.
  </p>
)}

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isPending}
            className={`uppercase tracking-widest py-4 w-full transition

              ${
                product.stock === 0
                  ? "bg-gray-300 cursor-not-allowed text-gray-600"
                  : "bg-[#dfb6b5] text-white cursor-pointer hover:opacity-90"
              }
            `}
          >
            {isPending ? "Adding..." : "Add To Cart"}
          </button>

          {product.stock === 0 && (
            <p className="text-red-500 text-sm font-semibold">
              This product is currently out of stock.
            </p>
          )}

          <button
  disabled={product.stock === 0}
  className={`uppercase tracking-widest py-4 w-full transition ${
    product.stock === 0
      ? "bg-gray-300 cursor-not-allowed text-gray-600"
      : "bg-[#c88f92] text-white cursor-pointer hover:opacity-90"
  }`}
>
  Buy it Now
</button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;