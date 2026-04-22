import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import products from '../../data/products.json'

function Products() {
  const [searchParams] = useSearchParams()
  const categoryFromURL = searchParams.get('category')

  const filteredProducts = products.filter(product => {
    if (categoryFromURL) return product.Category === categoryFromURL
    return true
  })

  return (
    <div className="bg-white shadow-sm min-h-screen p-8">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-center text-2xl uppercase tracking-widest mb-8 text-[#dfb6b5]">
          {categoryFromURL || 'All Products'}
        </h1>
        <div className="grid grid-cols-4 gap-x-2 gap-y-8">
          {filteredProducts.map(product => (
            <div key={product.PublicID} className="bg-white p-4">
              <ProductCard
                image={product.ImageURL}
                vendor={product.BrandName}
                name={product.ProductName}
                price={typeof product.Price === 'string' ? parseFloat(product.Price.replace('$', '')) : product.Price}
                href={`/products/${product.PublicID}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products