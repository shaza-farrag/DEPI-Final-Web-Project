import { useState } from "react"
import { useParams } from "react-router-dom"
import products from "../../data/products.json"

function ProductDetails() {
  const { id } = useParams()
  const product = products.find(p => p.PublicID === id)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="bg-white min-h-screen p-12">
      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12">
        
        
        <img
          src={product?.ImageURL}
          alt={product?.ProductName}
          className="w-full object-cover"
        />

        
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">{product?.BrandName}</p>
          <h1 className="text-3xl uppercase tracking-widest text-[#dfb6b5] font-semibold">{product?.ProductName}</h1>
          <p className="text-lg text-gray-700">{product?.Price}</p>

         
          <p className="text-sm text-gray-500">Quantity</p>
          <div className="flex items-center border border-gray-300 w-fit">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg">−</button>
            <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-lg">+</button>
          </div>

          
          <button className="bg-[#dfb6b5] text-white uppercase tracking-widest py-4 w-full">
            Add to Cart
          </button>
          <button className="bg-[#edd3d4] text-white uppercase tracking-widest py-4 w-full">
            Buy it Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails