import { useCategoryProducts } from "../../hooks/useCategoryProducts";
import { useBrandProducts } from "../../hooks/useBrandProducts";
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'

function Products() {
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("category");
  const brandId = searchParams.get("brand");

  const categoryQuery = useCategoryProducts(categoryId);
  const brandQuery = useBrandProducts(brandId);

  const query = brandId
    ? brandQuery
    : categoryQuery;

  const {
    data,
    isLoading,
    isError,
  } = query;

 return (
  <div className="bg-white shadow-sm min-h-screen p-8">
    <div className="max-w-8xl mx-auto">

      {isLoading ? (
        <p className="text-center text-lg">Loading...</p>

      ) : isError ? (
        <p className="text-center text-red-500">
          Failed to load products.
        </p>

      ) : brandId ? (
        <>
          <h1 className="text-center text-2xl uppercase tracking-widest mb-8 text-[#dfb6b5]">
            {data?.data?.brand?.name}
          </h1>

          <div className="grid grid-cols-4 gap-x-2 gap-y-8">
            {data?.data?.products?.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4"
              >
                <ProductCard
                  image={product.image.url}
                  vendor={product.brand.name}
                  name={product.name}
                  price={product.price}
                  href={`/products/${product._id}`}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center text-2xl uppercase tracking-widest mb-8 text-[#dfb6b5]">
            {data?.data?.category?.name}
          </h1>

          {data?.data?.brands?.map((brand) => (
            <div key={brand._id} className="mb-12">

              <h2 className="text-xl font-semibold mb-6 text-gray-700">
                {brand.name}
              </h2>

              <div className="grid grid-cols-4 gap-x-2 gap-y-8">

                {brand.products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white p-4"
                  >
                    <ProductCard
                      image={product.image.url}
                      vendor={product.brand.name}
                      name={product.name}
                      price={product.price}
                      href={`/products/${product._id}`}
                    />
                  </div>
                ))}

              </div>

            </div>
          ))}
        </>
      )}

    </div>
  </div>
);
}

export default Products